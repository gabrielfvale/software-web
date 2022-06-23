const { pool } = require("../services/db");
const { encryptPassword, comparePassword } = require("../util/encrypt");
const { generateAccessToken } = require("../util/auth");
const { errorHandler } = require("../util/error");

async function create(req, res) {
  try {
    const {
      username,
      password,
      confirm_password,
      first_name,
      last_name,
      email,
      country,
      bio,
    } = req.body;

    if (!(username && password && first_name && last_name && email)) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Find if user already exists
    const { rowCount } = await pool.query(
      `SELECT user_id FROM users WHERE username=$1 OR email=$2`,
      [username, email]
    );

    if (rowCount > 0) {
      return res
        .status(409)
        .json({ error: "User with that username or email already exists" });
    }

    // Encrypt password
    const encryptedPassword = await encryptPassword(password);

    // Insert user
    const { rows } = await pool.query(
      `INSERT INTO users (username, password, first_name, last_name, email, country, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING user_id`,
      [username, encryptedPassword, first_name, last_name, email, country, bio]
    );

    const { user_id } = rows[0];
    const token = generateAccessToken({ username, user_id });
    res.status(201).json({ token });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Find user
    const { rows } = await pool.query(
      `SELECT user_id, password
      FROM users
      WHERE username=$1`,
      [username]
    );

    if (rows.length !== 1) {
      return res.status(404).json({ error: "User not found" });
    }

    const { user_id, password: userPassword } = rows[0];

    // Compare user password
    const passwordMatch = await comparePassword(password, userPassword);

    if (passwordMatch) {
      const token = generateAccessToken({ username, user_id });
      return res.json({ token });
    }
    res.status(400).json({ error: "Username or password does not match" });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

module.exports = { create, login };
