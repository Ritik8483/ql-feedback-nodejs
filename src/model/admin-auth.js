const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminAuthSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
}, {timestamps: true});

exports.AdminAuth = mongoose.model("AuthAdminUser", adminAuthSchema); //model(Product) is always singular
