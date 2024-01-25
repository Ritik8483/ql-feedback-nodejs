const RolesTableController = require("../controller/roles-table");
const express = require("express");
const rolesRouter = express.Router();

const { addRoles, getAllRoles, getSingleRole, updateRole, deleteRole } =
  RolesTableController;

exports.roleTableRouters = rolesRouter
  .post("/", addRoles)
  .get("/", getAllRoles)
  .get("/:id", getSingleRole)
  .patch("/:id", updateRole)
  .delete("/:id", deleteRole);
