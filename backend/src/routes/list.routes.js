const express = require("express");
const router = express.Router();
const { authenticateToken, optionalToken } = require("../middlewares/auth");
const listController = require("../controllers/list.controller");

router.get("/user/:username", optionalToken, listController.user);
router.get("/popular", listController.popular);
router.get("/curated", listController.curated);
router.get("/:id", optionalToken, listController.details);

router.post("/like", authenticateToken, listController.like);

router.post("/add-movie", authenticateToken, listController.addMovie);
router.post("/add-special", authenticateToken, listController.addSpecial);
router.post("/", authenticateToken, listController.create);
router.put("/", authenticateToken, listController.update);
router.delete("/", authenticateToken, listController.deleteList);

module.exports = router;
