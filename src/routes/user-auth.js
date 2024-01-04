const express = require("express");
const userController = require("../controller/user-auth");
const userRouter = express.Router();

const { createUser, loginUser } = userController;

exports.userAuthTableRouters = userRouter
  .post("/login", loginUser)
  .post("/signup", createUser);
