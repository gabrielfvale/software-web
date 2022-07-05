const { tmdb } = require("../services/tmdb");
const { pool } = require("../services/db");
const { setCache } = require("../services/cache");
const { errorHandler } = require("../util/error");

async function details(req, res) {
  try {
    const { id } = req.params;
    const { data } = await tmdb.get(`/movie/${id}?append_to_response=credits`);
    const user_id = req.user?.user_id;

    const { rows: scores } = await pool.query(
      `
      SELECT score FROM reviews WHERE movie_api_id=$1
      `,
      [id]
    );

    const score =
      scores.length === 0
        ? 0
        : scores.reduce((prev, cur) => prev + Number(cur.score), 0) /
          scores.length;

    let metadata = {
      on_watch: false,
      on_favorites: false,
      reviewed_by_me: false,
      review: {},
    };

    if (user_id) {
      // Find if movie is in watch or favorite lists
      const { rows: onLists } = await pool.query(
        `
        SELECT list_type
        FROM lists LEFT JOIN movies_list ON lists.list_id = movies_list.list_id
        WHERE lists.user_id=$1
          AND movies_list.movie_api_id=$2
          AND list_type in ('watch', 'favorites') 
        GROUP BY lists.list_id
        `,
        [user_id, id]
      );
      // Iterate over results to update object
      onLists.forEach(({ list_type }) => {
        list_type === "watch"
          ? (metadata.on_watch = true)
          : (metadata.on_favorites = true);
      });

      // Find if movie was reviewed by user
      const { rows: review } = await pool.query(
        `
        SELECT reviews.*,
        (SELECT COUNT(*) FROM comments WHERE comments.review_id = reviews.review_id) AS comments,
        (SELECT COUNT(*) FROM like_review WHERE like_review.review_id = reviews.review_id) AS likes
        FROM reviews WHERE user_id=$1 AND movie_api_id=$2
        `,
        [user_id, id]
      );
      if (review.length === 1) {
        metadata.reviewed_by_me = true;
        metadata.review = { ...review[0] };
      }
    }

    res.status(200).json({
      id: data.id,
      score,
      ...metadata,
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      title: data.title,
      tagline: data.tagline,
      overview: data.overview,
      genres: data.genres,
      release_date: data.release_date,
      runtime: data.runtime,
      cast: data.credits.cast.slice(0, 4),
    });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function many(req, res) {
  try {
    const { movies } = req.params;
    const moviesArr = movies.split(",");

    const results = [];

    for (let i = 0; i < moviesArr.length; i++) {
      const { data } = await tmdb.get(`/movie/${moviesArr[i]}`);
      results.push({
        id: data.id,
        title: data.title,
        release_date: data.release_date,
        poster_path: data.poster_path,
      });
    }

    setCache(req.originalUrl, JSON.stringify(results), 86400);

    return res.status(200).json(results);
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function media(req, res) {
  try {
    const { movies, media_type } = req.query;

    if (media_type && media_type !== "posters" && media_type !== "backdrops") {
      return res.status(400).json({ error: "Invalid media_type" });
    }

    if (movies === "") {
      return res.status(200).json([]);
    }

    const results = [];
    for (movie of movies.split(",")) {
      const { data } = await tmdb.get(`/movie/${movie}/images`);
      const media = media_type || "posters";

      results.push({
        movie_id: Number(movie),
        media: data[media][0].file_path,
      });
    }

    setCache(req.originalUrl, JSON.stringify(results), 86400);

    return res.status(200).json(results);
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function popular(req, res) {
  try {
    const { query } = req;
    const page = query.page || 1;
    const { data } = await tmdb.get(`/movie/popular?page=${page}`);
    res.status(200).json({
      page: data.page,
      total_pages: Math.min(data.total_pages, 500),
      total_results: data.total_results,
      results: data.results.map((result) => ({
        id: result.id,
        title: result.title,
        genre_ids: result.genre_ids,
        release_date: result.release_date,
        poster_path: result.poster_path,
        backdrop_path: result.backdrop_path,
      })),
    });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function recommendations(req, res) {
  try {
    const { params, query } = req;
    const page = query.page || 1;
    const { data } = await tmdb.get(
      `/movie/${params.id}/recommendations?page=${page}`
    );
    res.status(200).json({
      page: data.page,
      total_pages: Math.min(data.total_pages, 500),
      total_results: data.total_results,
      results: data.results.map((result) => ({
        id: result.id,
        title: result.title,
        genre_ids: result.genre_ids,
        release_date: result.release_date,
        poster_path: result.poster_path,
        backdrop_path: result.backdrop_path,
      })),
    });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function discover(req, res) {
  const query_params = new URLSearchParams({ ...req.query }).toString();

  try {
    const { data } = await tmdb.get(
      `/discover/movie?certification_country=US&certification.lte=PG-13&${query_params}`
    );
    res.status(200).json({
      page: data.page,
      total_pages: Math.min(data.total_pages, 500),
      total_results: data.total_results,
      results: data.results.map((result) => ({
        id: result.id,
        title: result.title,
        genre_ids: result.genre_ids,
        release_date: result.release_date,
        poster_path: result.poster_path,
        backdrop_path: result.backdrop_path,
      })),
    });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function search(req, res) {
  try {
    let { query, page } = req.query;
    page = page || 1;
    const encodedQuery = encodeURI(query);

    const { data } = await tmdb.get(
      `/search/movie?query=${encodedQuery}&certification_country=US&certification.lte=PG-13&page=${page}`
    );

    res.status(200).json({
      page: data.page,
      total_pages: Math.min(data.total_pages, 500),
      total_results: data.total_results,
      results: data.results.map((movie) => ({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        tagline: movie.tagline,
        overview: movie.overview,
        genres: movie.genres,
        release_date: movie.release_date,
      })),
    });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

module.exports = {
  details,
  many,
  media,
  popular,
  recommendations,
  discover,
  search,
};
