const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../Controller/user-controller");
const { authenticateToken } = require("../Middleware/authenticateToken");

router.post("/login", login);
router.post("/register", register);
router.get("/user", authenticateToken, getUser);

module.exports = router;
