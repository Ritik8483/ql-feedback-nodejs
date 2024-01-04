//imports
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const feedbackParametersRouter = require("./src/routes/feedback-parameters");
const usersTableRouter = require("./src/routes/users-table");
const rolesTableRouter = require("./src/routes/roles-table");
const generateFormRouter = require("./src/routes/generate-form");
const adminAuthRouters = require("./src/routes/admin-auth");
const userAuthRouters = require("./src/routes/user-auth");

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

//middleware
const authMiddleware = (req, res, next) => {
  //method of initializing middleware
  console.log(req.get("Authorization"));
  const token = req.get("Authorization"); //as log contains = Bearer eyJhbGciOiJ
  try {
    const decoded = jwt.verify(token, "shhhhh"); //log gives { email: 'vats@gmail.com', iat: 1702471866 }
    console.log("decoded", decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
    console.log("error", error);
  }
};

//API's
app.use("/feedback-parameters", authMiddleware, feedbackParameterRouter);
app.use("/roles", authMiddleware, roleTableRouters);
app.use("/feedback-form", generateFormRouters);
app.use("/users", userTableRouters);
// app.use("/users", authMiddleware, userTableRouters);
// app.use("/feedback-form", authMiddleware, generateFormRouters);
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
app.listen(8080, () => {
  console.log("server started");
});
