const { pool } = require("../services/db");
const { encryptPassword, comparePassword } = require("../util/encrypt");
const { generateAccessToken } = require("../util/auth");

async function create(req, res, next) {
  try {
    const {
      username,
      password,
      confirmPassword,
      first_name,
      last_name,
      country,
      bio,
    } = req.body;

    if (!(username && password && first_name && last_name)) {
      return res.status(400).send({ error: "Missing fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Passwords do not match" });
    }

    // Find if user already exists
    const { rowCount } = await pool.query(
      `SELECT user_id FROM users WHERE username=$1`,
      [username]
    );

    if (rowCount > 0) {
      return res.status(409).send({ error: "User already exists" });
    }

    // Encrypt password
    const encryptedPassword = await encryptPassword(password);

    // Insert user
    const { rows } = await pool.query(
      `INSERT INTO users (username, password, first_name, last_name, country, bio)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING user_id`,
      [username, encryptedPassword, first_name, last_name, country, bio]
    );

    const { user_id } = rows[0];
    const token = generateAccessToken({ username, user_id });
    res.status(201).json({ token });
  } catch (e) {
    next(e);
    res.status(400).send({});
  }
}

async function login(req, res, next) {
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
      return res.status(404).send({ error: "User not found" });
    }

    const { user_id, password: userPassword } = rows[0];

    // Compare user password
    const passwordMatch = await comparePassword(password, userPassword);

    if (passwordMatch) {
      const token = generateAccessToken({ username, user_id });
      return res.json({ token });
    }
    res.status(400).send({ error: "Username or password does not match" });
  } catch (e) {
    next(e);
    res.status(400).send({});
  }
}

module.exports = { create, login };
