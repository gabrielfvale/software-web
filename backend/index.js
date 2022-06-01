const app = require("./src/app");
const { pool } = require("./src/db");
const port = process.env.APP_PORT || 8080;

const tmdb = require("./src/services/tmdb");

app.get("/status", async (_, res) => {
  try {
    await tmdb.get("/movie/526896");
    await pool.connect();
    res.status(200).send({ status: true });
  } catch (e) {
    res.status(500).send({ status: false });
  }
});

app.listen(port, () => {
  console.log(`API Running on ${port}`);
});
