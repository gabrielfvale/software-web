const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const reviewController = require("../controllers/review.controller");
const commentController = require("../controllers/comment.controller");

router.get("/popular", reviewController.popular);
router.get("/:id/comments", commentController.list);
router.get("/:movie_id", reviewController.get);

router.post("/like", authenticateToken, reviewController.get);

// Comments CRUD
router.post("/comment", authenticateToken, commentController.create);
router.put("/comment", authenticateToken, commentController.update);
router.delete("/comment", authenticateToken, commentController.deleteComment);

// Reviews CRUD
router.post("/", authenticateToken, reviewController.create);
router.put("/", authenticateToken, reviewController.update);
router.delete("/", authenticateToken, reviewController.deleteReview);

module.exports = router;
