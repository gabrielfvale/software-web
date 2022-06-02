const { pool } = require("../services/db");
const { tmdb } = require("../services/tmdb");

// TODO: Staff picks

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
    const { query } = req;
    const page = query.page || 1;
    const { data } = await tmdb.get(`/movie/popular?page=${page}`);
    res.json({
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
    next(e);
  }
}

async function recommendations(req, res, next) {
  try {
    const { params, query } = req;
    const page = query.page || 1;
    const { data } = await tmdb.get(
      `/movie/${params.id}/recommendations?page=${page}`
    );
    res.json({
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
    next(e);
  }
}

async function discover(req, res, next) {
  /* 
  Possible values for query params
  https://developers.themoviedb.org/3/discover/movie-discover

  page
    integer

  sort_by
    popularity.asc,
    popularity.desc,
    release_date.asc,
    release_date.desc,
    revenue.asc,
    revenue.desc,
    primary_release_date.asc,
    primary_release_date.desc,
    original_title.asc,
    original_title.desc,
    vote_average.asc,
    vote_average.desc,
    vote_count.asc,
    vote_count.desc
  
  release_date.gte
    string

  release_date.lte
    string

  year
    integer
  
  with_cast
    string
  
  with_genres
    string
  without_genres
    string
  */
  const query_params = new URLSearchParams({ ...req.query }).toString();
  try {
    const { data } = await tmdb.get(
      `/discover/movie?include_adult=false&${query_params}`
    );
    res.json({
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
    next(e);
  }
}

module.exports = { details, popular, recommendations, discover };
