const express = require("express");
const router = express.Router();
const { cacheMiddleware } = require("../middlewares/cache");
const movieController = require("../controllers/movie.controller");

router.get("/popular", movieController.popular);
router.get("/many/:movies", cacheMiddleware, movieController.many);
router.get("/discover", movieController.discover);
router.get("/:id/recommendations", movieController.recommendations);
router.get("/:id", movieController.details);

module.exports = router;
