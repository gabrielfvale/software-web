const { pool } = require("../services/db");
const { getPages, paginateQuery } = require("../util/paginate");
const { errorHandler } = require("../util/error");

async function list(req, res) {
  try {
    const { id } = req.params;
    let { page, per_page } = req.query;
    page = page || 1;
    per_page = per_page || 10;

    const { total_results, total_pages } = await getPages(
      "comments",
      "review_id",
      id,
      per_page
    );

    if (page > total_pages) {
      return res.status(400).json({ error: "Page exceeds limit" });
    }

    const { rows: results } = await pool.query(
      paginateQuery(
        `
        SELECT comments.*,
        (SELECT username FROM users WHERE users.user_id = comments.user_id) AS username
        FROM comments WHERE review_id=$1 ORDER BY comments.created_at DESC
        `,
        page,
        per_page
      ),
      [id]
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

async function create(req, res) {
  try {
    const { user_id } = req.user;
    const { review_id, description } = req.body;

    await pool.query(
      `
      INSERT INTO comments (user_id, review_id, description)
      VALUES ($1, $2, $3)
      `,
      [user_id, review_id, description]
    );
    res.status(201).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function update(req, res) {
  try {
    const { user_id } = req.user;
    const { comment_id, description } = req.body;

    const { rows } = await pool.query(
      `
      SELECT * FROM comments WHERE comment_id=$1
      `,
      [comment_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    } else if (String(rows[0].user_id) !== String(user_id)) {
      return res.status(403).json({ error: "Review not written by user" });
    }

    await pool.query(
      `
      UPDATE comments SET description=$1, updated_at=$2 WHERE comment_id=$3
      `,
      [description, new Date(), comment_id]
    );

    res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function deleteComment(req, res) {
  try {
    const { user_id } = req.user;
    const { comment_id } = req.body;

    // Find if comment exists
    const { rows: commented } = await pool.query(
      `SELECT * FROM comments WHERE user_id=$1 AND comment_id=$2`,
      [user_id, comment_id]
    );

    if (commented.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    await pool.query(
      `DELETE FROM comments WHERE user_id=$1 AND comment_id=$2`,
      [user_id, comment_id]
    );

    res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

module.exports = { list, create, update, deleteComment };
