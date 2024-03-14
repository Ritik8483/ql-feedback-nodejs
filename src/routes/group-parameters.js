const express = require("express");
const groupParametersController = require("../controller/group-parameters");
const groupParameterRouter = express.Router();
const { checkSchema } = require("express-validator");
const {
  addGroupFeedbackRules,
  getAllGroupFeedbacksRules,
  getSingleGroupFeedbackRules,
  updateGroupFeedbackRules,
  deleteGroupFeedbackRules,
} = require("../validations/validation");

const {
  getAllFeedbackGroup,
  addFeedbackGroup,
  getSingleFeedbackGroup,
  updateFeedbackGroup,
  deleteFeedbackGroup,
} = groupParametersController;

groupParameterRouter
  .get("/", checkSchema(getAllGroupFeedbacksRules), getAllFeedbackGroup)
  .get("/:id", checkSchema(getSingleGroupFeedbackRules), getSingleFeedbackGroup)
  .post("/", checkSchema(addGroupFeedbackRules), addFeedbackGroup)
  .patch("/:id", checkSchema(updateGroupFeedbackRules), updateFeedbackGroup)
  .delete("/:id", checkSchema(deleteGroupFeedbackRules), deleteFeedbackGroup);

exports.groupParameterRouter = groupParameterRouter;
