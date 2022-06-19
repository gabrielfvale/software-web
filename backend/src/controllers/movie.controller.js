const { tmdb } = require("../services/tmdb");

// TODO: Add request caching

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

async function many(req, res, next) {
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

    return res.status(200).json(results);
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
}

async function trending(req, res, next) {
  try {
    const { query } = req;
    const page = query.page || 1;
    const { data } = await tmdb.get(`/trending/movies/week?page=${page}`);
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

module.exports = { details, many, trending, recommendations, discover };
