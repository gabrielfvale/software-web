const { pool } = require("../services/db");
const { tmdb } = require("../services/tmdb");

async function details(req, res, next) {
  try {
    const { params } = req;
    const { data } = await tmdb.get(
      `/movie/${params.id}?append_to_response=credits`
    );
    res.json({
      id: data.id,
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      title: data.title,
      tagline: data.tagline,
      overview: data.overview,
      genres: data.genres,
      release_date: data.release_date,
      cast: data.credits.cast.slice(0, 4),
    });
  } catch (e) {
    next(e);
  }
}

async function popular(req, res, next) {
  try {
    const { data } = await tmdb.get(`/movie/popular`);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = { details, popular };
