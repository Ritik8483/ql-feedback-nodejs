const GenerateFormController = require("../controller/generate-form");
const express = require("express");
const generateRouter = express.Router();
const { checkSchema } = require("express-validator");
const {
  addGenerateFeedbackRules,
  getAllGenerateFeedbacksRules,
  getSingleGenerateFeedbackRules,
  updateGenerateFeedbackRules,
  deleteGenerateFeedbackRules,
} = require("../validations/validation");

const {
  addFeedbackForm,
  getAllFeedbackForm,
  getSingleFeedbackForm,
  updateFeedbackForm,
  deleteFeedbackForm,
} = GenerateFormController;

exports.generateFormRouters = generateRouter
  .post("/", checkSchema(addGenerateFeedbackRules), addFeedbackForm)
  .get("/", checkSchema(getAllGenerateFeedbacksRules), getAllFeedbackForm)
  .get("/:id", checkSchema(getSingleGenerateFeedbackRules), getSingleFeedbackForm)
  .patch("/:id", checkSchema(updateGenerateFeedbackRules), updateFeedbackForm)
  .delete("/:id", checkSchema(deleteGenerateFeedbackRules), deleteFeedbackForm);
