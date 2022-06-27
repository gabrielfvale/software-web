const { pool } = require("../services/db");
const { errorHandler } = require("../util/error");

async function get(req, res) {
  try {
    const { username } = req.params;

    const { rows: users } = await pool.query(
      `SELECT user_id, first_name, last_name, bio, country, admin
      FROM users
      WHERE username=$1`,
      [username]
    );

    if (users.length !== 1) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    // If the same user is signed in, return all lists
    const userSignedIn = req.user?.user_id === user.user_id;

    let listQuery = `SELECT * FROM lists WHERE user_id=$1`;

    if (!userSignedIn) {
      listQuery += `AND list_type='public'`;
    }

    const { rows: lists } = await pool.query(listQuery, [user.user_id]);

    res.status(200).json({ ...user, lists });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function stats(req, res) {
  try {
    const { username } = req.params;

    // Find if user exists
    const { rows } = await pool.query(
      `SELECT user_id FROM users WHERE username=$1`,
      [username]
    );

    if (rows.length !== 1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate review count
    const { rows: reviewed } = await pool.query(
      `SELECT COUNT(*) FROM reviews WHERE user_id=$1`,
      [rows[0].user_id]
    );
    const { count: movies_reviewed } = reviewed[0];

    // Calculate list count
    const { rows: list } = await pool.query(
      `SELECT COUNT(*) FROM lists WHERE user_id=$1`,
      [rows[0].user_id]
    );
    const { count: lists_created } = list[0];

    // Calculate likes
    const { rows: like_review } = await pool.query(
      `SELECT COUNT(*) FROM like_review WHERE user_id=$1`,
      [rows[0].user_id]
    );
    const { rows: like_list } = await pool.query(
      `SELECT COUNT(*) FROM like_list WHERE user_id=$1`,
      [rows[0].user_id]
    );
    const likes_received =
      Number(like_review[0].count) + Number(like_list[0].count);

    res.status(200).json({
      movies_reviewed: Number(movies_reviewed),
      lists_created: Number(lists_created),
      likes_received,
    });
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

async function update(req, res) {
  try {
    const { username, first_name, last_name, country, bio } = req.body;
    const { user_id } = req.user;

    // Find if user exists
    const { rows } = await pool.query(
      `SELECT user_id FROM users WHERE username=$1`,
      [username]
    );

    if (rows.length === 1 && rows[0].user_id !== user_id) {
      return res.status(409).json({ error: "Username already taken" });
    }

    await pool.query(
      `UPDATE users SET
      username=$2, first_name=$3, last_name=$4, country=$5, bio=$6
      WHERE user_id=$1`,
      [user_id, username, first_name, last_name, country, bio]
    );

    res.status(200).end();
  } catch (e) {
    const { status, body } = errorHandler(e);
    res.status(status).json(body);
  }
}

module.exports = { get, stats, update };
