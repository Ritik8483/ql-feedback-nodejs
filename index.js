//imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const feedbackParametersRouter = require("./src/routes/feedback-parameters");
const usersTableRouter = require("./src/routes/users-table");
const rolesTableRouter = require("./src/routes/roles-table");
const generateFormRouter = require("./src/routes/generate-form");
const adminAuthRouters = require("./src/routes/admin-auth");
const userAuthRouters = require("./src/routes/user-auth");
const groupParameterRouters = require("./src/routes/group-parameters");
const sendEmail = require("./src/controller/sendEmail");
const { authMiddleware } = require("./src/middleware/authMiddleware");

// const adminRouter = require("./src/routes/feedback-parameters");

//using imports
const app = express();
app.use(cors()); //cors policy for frontend
app.use(express.json()); //body parser

//routes
const { feedbackParameterRouter } = feedbackParametersRouter;
const { userTableRouters } = usersTableRouter;
const { roleTableRouters } = rolesTableRouter;
const { generateFormRouters } = generateFormRouter;
const { adminAuthTableRouters } = adminAuthRouters;
const { userAuthTableRouters } = userAuthRouters;
const { groupParameterRouter } = groupParameterRouters;

//API's
app.post("/send", authMiddleware, sendEmail);
app.use("/feedback-parameters", authMiddleware, feedbackParameterRouter);
app.use("/roles", authMiddleware, roleTableRouters);
app.use("/feedback-form", generateFormRouters);
app.use("/group-parameters", authMiddleware, groupParameterRouter);
app.use("/users", userTableRouters);
app.use("/auth", adminAuthTableRouters);
app.use("/", userAuthTableRouters);

// app.use("/admin/login", adminRouter.adminRouters);

//Moongoose connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DB_MONGO_DB);
  console.log("moongoose connected");
}
//Server Connection
app.listen(process.env.PORT, () => {
  console.log("server started");
});
