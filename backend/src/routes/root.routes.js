const express = require("express");
const router = express.Router();
const rootController = require("../controllers/root.controller");

router.get("/health", rootController.health);

module.exports = router;
