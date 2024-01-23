const mongoose = require("mongoose");
const { Schema } = mongoose;

const userAuthSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    token: String,
  },
  { timestamps: true }
);

exports.UserAuth = mongoose.model("UserAuth", userAuthSchema); //model(Product) is always singular
