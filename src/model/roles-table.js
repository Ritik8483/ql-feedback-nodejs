const mongoose = require("mongoose");
const { Schema } = mongoose;

const RolesTableSchema = new Schema(
  {
    teamName: {
      type: String,
      unique: true,
      required: [true, "Team name is required"],
    },
    teamEmail: {
      type: String,
      required: [true, "Team email is required"],
      unique: true,
    },
    // teamUsers: { type: [String] },
    teamUsers: [{ type: Schema.Types.ObjectId, ref: "UserTable" }],
  },
  { timestamps: true }
);

exports.RoleTable = mongoose.model(
  "RoleTable", //give this singular name , from this the collection stores in  the mdb
  RolesTableSchema
);
