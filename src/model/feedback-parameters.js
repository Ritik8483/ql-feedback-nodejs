const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackParametersSchema = Schema({
  feedbackName: {
    type: String,
    required: [true, "Feedback Name is required"],
    unique: true,
  },
  feedbackDescription: {
    type: String,
    required: [true, "Feedback Description is required"],
  },
  feedback_parameter_type: {
    type: String,
    required: [true, "Feedback Description is required"],
  },
});

exports.FeedbackParameter = mongoose.model(
  "FeedbackParameter", //give this singular name , from this the collection stores in  the mdb
  FeedbackParametersSchema
);
