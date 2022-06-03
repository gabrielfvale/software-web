const jwt = require("jsonwebtoken");
const { getTokenFromHeaders } = require("../util/auth");

function authenticateToken(req, res, next) {
  const token = getTokenFromHeaders(req.headers);

  if (!token) {
    return res.status(401).send({ error: "User is not authenticated" });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

function optionalToken(req, res, next) {
  const token = getTokenFromHeaders(req.headers);

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) return next();

    req.user = user;

    next();
  });
}

module.exports = { authenticateToken, optionalToken };
