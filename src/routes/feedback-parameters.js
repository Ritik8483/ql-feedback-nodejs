const express = require("express");
const feedbackParametersController = require("../controller/feedback-parameters");
const feedbackParameterRouter = express.Router();
const { checkSchema } = require("express-validator");
const {
  addFeedbackParameterRules,
  getAllFeedbackParametersRules,
  getSingleFeedbackParameterRules,
  updateFeedbackParametersRules,
  deleteFeedbackParametersRules,
} = require("../validations/validation");

const {
  getAllFeedbackParameters,
  addFeedbackParameters,
  getSingleFeedbackParameter,
  updateFeedbackParameters,
  deleteFeedbackParameters,
} = feedbackParametersController;

feedbackParameterRouter
  .get(
    "/",
    checkSchema(getAllFeedbackParametersRules),
    getAllFeedbackParameters
  )
  .get(
    "/:id",
    checkSchema(getSingleFeedbackParameterRules),
    getSingleFeedbackParameter
  )
  .post("/", checkSchema(addFeedbackParameterRules), addFeedbackParameters)
  .patch(
    "/:id",
    checkSchema(updateFeedbackParametersRules),
    updateFeedbackParameters
  )
  .delete(
    "/:id",
    checkSchema(deleteFeedbackParametersRules),
    deleteFeedbackParameters
  );

exports.feedbackParameterRouter = feedbackParameterRouter;
// check("id","Invalid Mongodb Id").isMongoId(),

// const express = require("express");
// const feedbackParametersController = require("../controller/feedback-parameters");
// const feedbackParameterRouter = express.Router();
// const { checkSchema } = require("express-validator");
// const { addFeedbackParameterRules } = require("../validations/validation");

// const {
//   getAllFeedbackParameters,
//   addFeedbackParameters,
//   getSingleFeedbackParameter,
//   updateFeedbackParameters,
//   deleteFeedbackParameters,
// } = feedbackParametersController;

// feedbackParameterRouter
//   .get("/", getAllFeedbackParameters)
//   .get("/:id", getSingleFeedbackParameter)
//   .post("/", checkSchema(addFeedbackParameterRules), addFeedbackParameters)
//   .patch("/:id", updateFeedbackParameters)
//   .delete("/:id", deleteFeedbackParameters);

// exports.feedbackParameterRouter = feedbackParameterRouter;
