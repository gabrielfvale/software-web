const { pool } = require("../services/db");
const { tmdb } = require("../services/tmdb");
const { setCache } = require("../services/cache");
const {
  getPages,
  getPagesFromCount,
  paginateQuery,
} = require("../util/paginate");
const { errorHandler } = require("../util/error");

async function get(req, res) {
  try {
    const { movie_id } = req.params;
    let { page, per_page } = req.query;
    const user_id = req.user?.user_id || -1;

    page = page || 1;
    per_page = per_page || 10;

    const { total_results, total_pages } = await getPages(
      "reviews",
      ["movie_api_id"],
      [movie_id],
      per_page
    );

    if (page > total_pages) {
      return res.status(400).json({ error: "Page exceeds limit" });
    }

    const { rows: results } = await pool.query(
      paginateQuery(
        `
        SELECT reviews.*,
        (SELECT username FROM users WHERE users.user_id = reviews.user_id) AS username,
        (SELECT COUNT(*) FROM comments WHERE comments.review_id = reviews.review_id) AS comments,
        (SELECT COUNT(*) FROM like_review WHERE like_review.review_id = reviews.review_id) AS likes,
        (SELECT EXISTS(SELECT 1 FROM like_review WHERE like_review.user_id=$1 )) AS liked_by_me
        FROM reviews WHERE movie_api_id=$2
        ORDER BY reviews.created_at DESC
        `,
        page,
        per_page
      ),
      [user_id, movie_id]
    );

    res.status(200).json({
      page,
      total_pages,
      total_results,
      results,
    });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function popular(req, res) {
  try {
    let { page, per_page } = req.query;
    page = page || 1;
    per_page = per_page || 10;

    // Count reviews for pagination
    const { rows: count } = await pool.query(
      `
      SELECT COUNT(*) FROM (SELECT reviews.*, COUNT(like_review.review_id) AS likes
      FROM reviews LEFT JOIN like_review ON reviews.review_id = like_review.review_id
      GROUP BY reviews.review_id
      HAVING COUNT(like_review.review_id) > 0) AS count
      `
    );
    const total_results = Number(count[0].count);
    const total_pages = getPagesFromCount(total_results, per_page);

    // Get reviews
    const { rows } = await pool.query(
      paginateQuery(
        `
        SELECT popular_reviews.*, users.username FROM (
          SELECT reviews.*, COUNT(like_review.review_id) AS likes, COUNT(comments) AS comments
                FROM reviews LEFT JOIN like_review ON reviews.review_id = like_review.review_id
                LEFT JOIN comments ON comments.review_id = reviews.review_id
                GROUP BY reviews.review_id
                HAVING COUNT(like_review.review_id) > 0
                ORDER BY likes,comments  DESC) as popular_reviews
          INNER JOIN users ON users.user_id = popular_reviews.user_id
        `,
        page,
        per_page
      )
    );

    // Get movie details for each review
    const results = [];
    for (let i = 0; i < rows.length; i++) {
      const { data } = await tmdb.get(`/movie/${rows[i].movie_api_id}`);
      results.push({
        ...rows[i],
        title: data.title,
        release_date: data.release_date,
        poster_path: data.poster_path,
      });
    }

    // Set redis cache
    setCache(
      req.originalUrl,
      JSON.stringify({ total_results, total_pages, results })
    );

    return res.status(200).json({ total_results, total_pages, results });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function create(req, res) {
  try {
    const { user_id } = req.user;
    const { movie_api_id, score, description } = req.body;

    // Find if user already reviewed movie
    const { rows: reviewed } = await pool.query(
      `SELECT review_id FROM reviews WHERE user_id=$1 AND movie_api_id=$2`,
      [user_id, movie_api_id]
    );

    if (reviewed.length !== 0) {
      return res.status(400).json({ error: "Movie already reviewed by user" });
    }

    const { rows } = await pool.query(
      `
      INSERT INTO reviews
      (user_id, movie_api_id, score, description)
      VALUES ($1, $2, $3, $4)
      RETURNING review_id
      `,
      [user_id, movie_api_id, score, description]
    );

    if (rows.length !== 1) {
      throw Error("Error sending review");
    }

    res.status(201).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function update(req, res) {
  try {
    const { user_id } = req.user;
    const { movie_api_id, score, description } = req.body;

    // Find if review exists
    const { rows: reviewed } = await pool.query(
      `SELECT review_id FROM reviews WHERE user_id=$1 AND movie_api_id=$2`,
      [user_id, movie_api_id]
    );

    if (reviewed.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    await pool.query(
      `
      UPDATE reviews SET score=$1, description=$2, updated_at=$3
      WHERE user_id=$4 AND movie_api_id=$5`,
      [score, description, new Date(), user_id, movie_api_id]
    );

    res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function deleteReview(req, res) {
  try {
    const { user_id: requestingUser } = req.user;
    const { user_id, movie_api_id } = req.body;

    // Find if review exists
    const { rows: reviewed } = await pool.query(
      `SELECT review_id FROM reviews WHERE user_id=$1 AND movie_api_id=$2`,
      [user_id, movie_api_id]
    );

    if (reviewed.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    const { rows: user } = await pool.query(
      `
      SELECT * from users WHERE user_id=$1
      `,
      [requestingUser]
    );

    // Delete review if user_id matches or requesting user is admin
    if (
      user.length !== 0 &&
      (Number(user[0].user_id) === Number(user_id) || user[0].admin)
    ) {
      await pool.query(
        `DELETE FROM reviews WHERE user_id=$1 AND movie_api_id=$2`,
        [user_id, movie_api_id]
      );
    }

    res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function like(req, res) {
  try {
    const { user_id } = req.user;
    const { review_id } = req.body;

    // Find review
    const { rows } = await pool.query(
      `SELECT * FROM reviews WHERE review_id=$1`,
      [review_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    const review = rows[0];

    // If review belongs to user trying to like, return error
    if (review.user_id === String(user_id)) {
      return res
        .status(400)
        .json({ error: "Not possible to like your own review" });
    }

    const { rows: like_rows } = await pool.query(
      `SELECT * FROM like_review WHERE user_id=$1 AND review_id=$2`,
      [user_id, review.review_id]
    );

    // Like or unlike review
    if (like_rows.length === 0) {
      // User is going to like review
      await pool.query(
        `INSERT INTO like_review (user_id, review_id) VALUES ($1, $2)`,
        [user_id, review.review_id]
      );
    } else {
      // User is going to unlike review
      await pool.query(
        `DELETE FROM like_review WHERE user_id=$1 AND review_id=$2`,
        [user_id, review.review_id]
      );
    }
    res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

module.exports = {
  get,
  popular,
  create,
  update,
  deleteReview,
  like,
};
