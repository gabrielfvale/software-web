const express = require("express");
const router = express.Router();
const { authenticateToken, optionalToken } = require("../middlewares/auth");
const profileController = require("../controllers/profile.controller");

router.get("/:username", optionalToken, profileController.get);
router.get("/:username/stats", optionalToken, profileController.stats);
router.put("/", authenticateToken, profileController.update);

module.exports = router;
