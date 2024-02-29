const UsersTableController = require("../controller/users-table");
const express = require("express");
const usersRouter = express.Router();
const { checkSchema } = require("express-validator");
const {
  addUserRules,
  getAllUsersRules,
  getSingleUserRules,
  updateUserRules,
  deleteUserRules,
} = require("../validations/validation");

const { addUsers, getAllUsers, getSingleUser, updateUsers, deleteUsers } =
  UsersTableController;

exports.userTableRouters = usersRouter
  .post("/", checkSchema(addUserRules), addUsers)
  .get("/", checkSchema(getAllUsersRules), getAllUsers)
  .get("/:id", checkSchema(getSingleUserRules), getSingleUser)
  .patch("/:id", checkSchema(updateUserRules), updateUsers)
  .delete("/:id", checkSchema(deleteUserRules), deleteUsers);
