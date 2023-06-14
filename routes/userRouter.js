const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/users", userController.allUsers);
router.post("/addUser", userController.addUser);
router.post("/log", userController.login);

module.exports = router;
