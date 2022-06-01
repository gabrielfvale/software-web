const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");

router.get("/:id", movieController.details);

module.exports = router;
