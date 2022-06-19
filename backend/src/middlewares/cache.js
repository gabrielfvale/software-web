const { getCache } = require("../services/cache");

async function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  try {
    const data = await getCache(key);
    if (!data) {
      return next();
    }

    return res.send(JSON.parse(data));
  } catch (e) {
    next();
  }
}

module.exports = { cacheMiddleware };
