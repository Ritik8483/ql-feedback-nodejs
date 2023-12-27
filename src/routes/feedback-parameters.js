const express = require("express");
const feedbackParametersController = require("../controller/feedback-parameters");
const feedbackParameterRouter = express.Router();
const {
  getAllFeedbackParameters,
  addFeedbackParameters,
  getSingleFeedbackParameter,
  updateFeedbackParameters,
  deleteFeedbackParameters,
} = feedbackParametersController;


feedbackParameterRouter
  .get("/", getAllFeedbackParameters)
  .get("/:id", getSingleFeedbackParameter)
  .post("/", addFeedbackParameters)
  .patch("/:id", updateFeedbackParameters)
  .delete("/:id", deleteFeedbackParameters);

exports.feedbackParameterRouter = feedbackParameterRouter;
