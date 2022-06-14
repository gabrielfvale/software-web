const { pool } = require("../services/db");
const { tmdb } = require("../services/tmdb");

async function status(_, res, next) {
  try {
    await tmdb.get("/movie/526896");
    await pool.connect();
    res.status(200).send({ status: true });
  } catch (e) {
    res.status(500).send({ status: false });
  }
}

module.exports = { status };
