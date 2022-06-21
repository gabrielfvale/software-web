const express = require("express");
const router = express.Router();
const rootController = require("../controllers/root.controller");

router.get("/health", rootController.health);
router.get("/config", rootController.config);

module.exports = router;
