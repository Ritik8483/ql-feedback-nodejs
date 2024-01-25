const UsersTableController = require("../controller/users-table");
const express = require("express");
const usersRouter = express.Router();

const { addUsers, getAllUsers, getSingleUser, updateUsers, deleteUsers } =
  UsersTableController;

exports.userTableRouters = usersRouter
  .post("/", addUsers)
  .get("/", getAllUsers)
  .get("/:id", getSingleUser)
  .patch("/:id", updateUsers)
  .delete("/:id", deleteUsers);
