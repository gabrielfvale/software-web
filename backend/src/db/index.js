const { Pool } = require("pg");

const { DB_NAME, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

const pool = new Pool({
  user: DB_USERNAME,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  host: DB_HOST,
});

module.exports = { pool };
