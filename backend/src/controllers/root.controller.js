const { pool } = require("../services/db");
const { tmdb } = require("../services/tmdb");
const { cache } = require("../services/cache");

async function health(_, res) {
  const services = [
    {
      name: "TMDB",
      test: async () =>
        await tmdb.get("/movie/526896/external_ids", {
          timeout: 1000,
        }),
    },
    {
      name: "POSTGRES",
      test: async () => await pool.connect(),
    },
    {
      name: "REDIS",
      test: async () => await cache.info(),
    },
  ];

  const status = {};

  for (service of services) {
    try {
      await service.test();
      status[service.name] = true;
    } catch (e) {
      status[service.name] = false;
    }
  }

  res.json(status);
}

async function config(_, res) {
  try {
    const { data } = await tmdb.get("/configuration");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).end();
  }
}

async function media(req, res) {
  const { size, path } = req.params;

  const mediaURL = process.env.TMDB_MEDIA_URL;

  res.status(301).redirect(`${mediaURL}/${size}/${path}`);
}

module.exports = { health, config, media };
