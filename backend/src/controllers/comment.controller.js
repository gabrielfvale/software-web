const { pool } = require("../services/db");
const { tmdb } = require("../services/tmdb");

// TODO: Comment controller

async function list(req, res, next) {
  try {
  } catch (e) {
    res.status(500).send({});
  }
}

async function create(req, res, next) {
  try {
  } catch (e) {
    res.status(500).send({});
  }
}

async function update(req, res, next) {
  try {
  } catch (e) {
    res.status(500).send({});
  }
}

async function deleteComment(req, res, next) {
  try {
  } catch (e) {
    res.status(500).send({});
  }
}

module.exports = { list, create, update, deleteComment };
