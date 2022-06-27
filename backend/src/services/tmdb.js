const axios = require("axios").default;

const { TMDB_API_URL, TMDB_BEARER_TOKEN } = process.env;

const tmdb = axios.create({
  baseURL: TMDB_API_URL,
  timeout: 5000,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
  },
});

module.exports = { tmdb };
