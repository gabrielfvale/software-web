const express = require("express");
const router = express.Router();
const rootController = require("../controllers/root.controller");

router.get("/health", rootController.health);
router.get("/config", rootController.config);
router.get("/media/:size/:path", rootController.media);

module.exports = router;
