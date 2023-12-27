const mongoose = require("mongoose");
const { Schema } = mongoose;

const GenerateFormSchema = new Schema({
  feedback_type: {
    type: String,
    required: [true, "Feedback type is required"],
  },
  review: [{ type: Schema.Types.ObjectId, ref: "UserTable" }],
  //   responses: { type: [String] },
  feedback_parameters: [
    { type: Schema.Types.ObjectId, ref: "FeedbackParameter" },
  ],
  reviewer: [{ type: Schema.Types.ObjectId, ref: "UserTable" }],
  reviewerEmails: String,
});

exports.GenerateFormTable = mongoose.model(
  "GenerateFormTable", //give this singular name , from this the collection stores in  the mdb
  GenerateFormSchema
);
