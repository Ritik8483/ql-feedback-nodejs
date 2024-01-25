const express = require("express");
const groupParametersController = require("../controller/group-parameters");
const groupParameterRouter = express.Router();
const {
  getAllFeedbackGroup,
  addFeedbackGroup,
  getSingleFeedbackGroup,
  updateFeedbackGroup,
  deleteFeedbackGroup,
} = groupParametersController;

groupParameterRouter
  .get("/", getAllFeedbackGroup)
  .get("/:id", getSingleFeedbackGroup)
  .post("/", addFeedbackGroup)
  .patch("/:id", updateFeedbackGroup)
  .delete("/:id", deleteFeedbackGroup);

exports.groupParameterRouter = groupParameterRouter;
