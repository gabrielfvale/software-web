const { pool } = require("../services/db");
const { tmdb } = require("../services/tmdb");

// TODO: Review controller

async function get(req, res, next) {
  try {
  } catch (e) {
    res.status(500).send({});
  }
}

async function popular(req, res, next) {
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

async function deleteReview(req, res, next) {
  try {
  } catch (e) {
    res.status(500).send({});
  }
}

async function like(req, res, next) {
  try {
  } catch (e) {
    res.status(500).send({});
  }
}

module.exports = {
  get,
  popular,
  create,
  update,
  deleteReview,
  like,
};
