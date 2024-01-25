const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupParametersSchema = Schema(
  {
    feedbackGroupName: {
      type: String,
      required: [true, "Feedback group Name is required"],
      unique: true,
    },
    groupFeedbacks: [{ type: Schema.Types.ObjectId, ref: "FeedbackParameter" }],
  },
  { timestamps: true }
);

exports.GroupParameter = mongoose.model(
  "GroupParameter", //give this singular name , from this the collection stores in  the mdb
  GroupParametersSchema
);
