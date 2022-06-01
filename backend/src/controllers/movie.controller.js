const { pool } = require("../services/db");
const { tmdb } = require("../services/tmdb");

async function details(req, res, next) {
  try {
    const { params } = req;
    const { data } = await tmdb.get(`/movie/${params.id}`);
    res.json(data);
  } catch (e) {
    res.status(400);
  }
}

module.exports = { details };
