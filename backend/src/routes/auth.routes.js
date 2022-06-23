const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/sign-up", authController.create);
router.post("/sign-in", authController.login);
router.post("/request-reset-password", authController.requestResetPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
