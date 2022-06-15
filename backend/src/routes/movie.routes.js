const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

router.get("/trending", movieController.trending);
router.get("/:id/recommendations", movieController.recommendations);
router.get("/discover", movieController.discover);
router.get("/:id", movieController.details);

module.exports = router;
