const express = require("express");
const router = express.Router();
const { authenticateToken, optionalToken } = require("../middlewares/auth");
const { cacheMiddleware } = require("../middlewares/cache");
const reviewController = require("../controllers/review.controller");
const commentController = require("../controllers/comment.controller");

router.get("/popular", cacheMiddleware, reviewController.popular);
router.get("/user/:username", optionalToken, reviewController.user);
router.get("/:id/comments", commentController.list);
router.get("/:movie_id", optionalToken, reviewController.get);

router.post("/like", authenticateToken, reviewController.like);

// Comments CRUD
router.post("/comment", authenticateToken, commentController.create);
router.put("/comment", authenticateToken, commentController.update);
router.delete(
  "/comment/:id",
  authenticateToken,
  commentController.deleteComment
);

// Reviews CRUD
router.post("/", authenticateToken, reviewController.create);
router.put("/", authenticateToken, reviewController.update);
router.delete("/:id", authenticateToken, reviewController.deleteReview);

module.exports = router;
