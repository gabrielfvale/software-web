const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/sign-up", authController.create);
router.post("/sign-in", authController.login);

module.exports = router;
