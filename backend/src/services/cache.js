const Redis = require("ioredis");

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;

const cache = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
});

cache.on("error", () => {});

async function getCache(key) {
  return await cache.get(key);
}

async function setCache(key, value, expiration = 60) {
  return await cache.set(key, value, "EX", expiration);
}

module.exports = { getCache, setCache };
