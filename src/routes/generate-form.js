const GenerateFormController = require("../controller/generate-form");
const express = require("express");
const generateRouter = express.Router();

const {
  addFeedbackForm,
  getAllFeedbackForm,
  getSingleFeedbackForm,
  updateFeedbackForm,
  deleteFeedbackForm,
} = GenerateFormController;

exports.generateFormRouters = generateRouter
  .post("/", addFeedbackForm)
  .get("/", getAllFeedbackForm)
  .get("/:id", getSingleFeedbackForm)
  .patch("/:id", updateFeedbackForm)
  .delete("/:id", deleteFeedbackForm);
