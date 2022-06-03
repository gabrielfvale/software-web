const express = require("express");
const router = express.Router();
const { authenticateToken, optionalToken } = require("../middlewares/auth");
const reviewController = require("../controllers/review.controller");
const commentController = require("../controllers/comment.controller");

module.exports = router;
