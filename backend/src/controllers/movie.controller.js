const { tmdb } = require("../services/tmdb");
const { pool } = require("../services/db");
const { setCache } = require("../services/cache");
const { errorHandler } = require("../util/error");

async function details(req, res) {
  try {
    const { id } = req.params;
    const { data } = await tmdb.get(`/movie/${id}?append_to_response=credits`);

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

    res.status(200).json({
      id: data.id,
      score,
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

    setCache(req.originalUrl, JSON.stringify(results));

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

    const results = [];
    for (movie of movies.split(",")) {
      const { data } = await tmdb.get(`/movie/${movie}/images`);
      const media = media_type || "posters";

      results.push({
        movie_id: Number(movie),
        media: data[media][0].file_path,
      });
    }

    setCache(req.originalUrl, JSON.stringify(results));

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
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: data.results.map((result) => ({
        id: result.id,
        title: result.title,
        genre_ids: result.genre_ids,
        release_date: result.release_date,
        poster_path: result.poster_path,
        backdrop_path: result.poster_path,
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
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: data.results.map((result) => ({
        id: result.id,
        title: result.title,
        genre_ids: result.genre_ids,
        release_date: result.release_date,
        poster_path: result.poster_path,
        backdrop_path: result.poster_path,
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
      `/discover/movie?include_adult=false&${query_params}`
    );
    res.status(200).json({
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: data.results.map((result) => ({
        id: result.id,
        title: result.title,
        genre_ids: result.genre_ids,
        release_date: result.release_date,
        poster_path: result.poster_path,
        backdrop_path: result.poster_path,
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
      `/search/movie?query=${encodedQuery}&include_adult=false&page=${page}`
    );

    res.status(200).json({
      page: data.page,
      total_pages: data.total_pages,
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
