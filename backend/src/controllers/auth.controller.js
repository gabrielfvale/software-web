const crypto = require("crypto");
const { pool } = require("../services/db");
const { encryptPassword, comparePassword } = require("../util/encrypt");
const { generateAccessToken } = require("../util/auth");
const { sendEmail } = require("../util/email");
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

async function requestResetPassword(req, res) {
  try {
    const { email } = req.body;

    // Find user
    const { rows } = await pool.query(
      `SELECT user_id, token
      FROM users
      WHERE email=$1`,
      [email]
    );

    if (rows.length !== 1) {
      return res.status(404).json({ error: "User not found" });
    }

    const userInfo = rows[0];
    if (userInfo.token !== "" && userInfo.token !== "NULL") {
      return res
        .status(400)
        .json({ error: "A recover email was already sent" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    await pool.query(
      `
      UPDATE users SET token=$1 WHERE email=$2
      `,
      [resetToken, email]
    );

    const err = await sendEmail(email, resetToken, userInfo.user_id);
    if (err) {
      return res
        .status(500)
        .json({ error: "There was an error sending the email" });
    }
    return res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function resetPassword(req, res) {
  try {
    const { token, user_id, password } = req.body;

    // Find user
    const { rows } = await pool.query(
      `SELECT token
      FROM users
      WHERE user_id=$1`,
      [user_id]
    );

    if (rows.length !== 1) {
      return res.status(404).json({ error: "User not found" });
    }

    const { token: userToken } = rows[0];

    if (token !== userToken) {
      return res.status(400).json({ error: "Invalid password reset token" });
    }

    const encryptedPassword = await encryptPassword(password);

    await pool.query(
      `
      UPDATE users SET password=$1, token='' WHERE user_id=$2
      `,
      [encryptedPassword, user_id]
    );

    res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

module.exports = { create, login, requestResetPassword, resetPassword };
