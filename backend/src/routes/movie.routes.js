const express = require("express");
const router = express.Router();
const { optionalToken } = require("../middlewares/auth");
const { cacheMiddleware } = require("../middlewares/cache");
const movieController = require("../controllers/movie.controller");

router.get("/popular", movieController.popular);
router.get("/media", cacheMiddleware, movieController.media);
router.get("/many/:movies", cacheMiddleware, movieController.many);
router.get("/discover", movieController.discover);
router.get("/search", movieController.search);
router.get("/:id/recommendations", movieController.recommendations);
router.get("/:id", optionalToken, movieController.details);

module.exports = router;
