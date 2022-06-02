const express = require("express");
const router = express.Router();
const listController = require("../controllers/list.controller");

router.get("/user/:username", listController.user);
router.get("/:id", listController.details);
router.get("/popular", listController.popular);
router.post("/", listController.create);
router.put("/", listController.update);
router.delete("/", listController.deleteList);

module.exports = router;
