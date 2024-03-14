const RolesTableController = require("../controller/roles-table");
const express = require("express");
const rolesRouter = express.Router();
const { checkSchema } = require("express-validator");
const {
  addRolesRules,
  getAllRolesRules,
  getSingleRoleRules,
  updateRoleRules,
  deleteRoleRules,
} = require("../validations/validation");

const { addRoles, getAllRoles, getSingleRole, updateRole, deleteRole } =
  RolesTableController;

exports.roleTableRouters = rolesRouter
  .post("/", checkSchema(addRolesRules), addRoles)
  .get("/", checkSchema(getAllRolesRules), getAllRoles)
  .get("/:id", checkSchema(getSingleRoleRules), getSingleRole)
  .patch("/:id", checkSchema(updateRoleRules), updateRole)
  .delete("/:id", checkSchema(deleteRoleRules), deleteRole);
