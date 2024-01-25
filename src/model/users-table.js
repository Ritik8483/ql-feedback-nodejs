const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersTableSchema = new Schema(
  {
    designation: { type: String, required: [true, "Designation is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
    },
  },
  { timestamps: true }
);

exports.UserTable = mongoose.model(
  "UserTable", //give this singular name , from this the collection stores in  the mdb
  UsersTableSchema
);
