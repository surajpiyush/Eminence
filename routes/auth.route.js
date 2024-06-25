const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const {  auth } = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout",auth, logout);

module.exports = authRouter;
