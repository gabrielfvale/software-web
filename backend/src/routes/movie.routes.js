const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

router.get("/details/:id", movieController.details);
router.get("/popular", movieController.popular);
router.get("/:id/recommendations", movieController.recommendations);

module.exports = router;