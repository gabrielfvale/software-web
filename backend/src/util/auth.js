const jwt = require("jsonwebtoken");

function generateAccessToken(data, expiresIn = "3600") {
  return jwt.sign(data, process.env.JWT_TOKEN_SECRET, {
    expiresIn: `${expiresIn}s`,
  });
}

function getTokenFromHeaders(headers) {
  const authHeader = headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
}

module.exports = { generateAccessToken, getTokenFromHeaders };
