//NOT IN USE
const userModel = require("../model/user-auth");
const jwt = require("jsonwebtoken");
const UserAuth = userModel.UserAuth;
const bcrypt = require("bcrypt");
const codes = require("../constant/code");
const messages = require("../constant/messages");

const {
  loginUserAuthCodes: { loginUserCode, signupUserCode },
} = codes;

const {
  loginUserAuthMsg: { loginUserMsg, signupUserMsg },
} = messages;

exports.createUser = async (req, res) => {
  try {
    const token = jwt.sign({ email: req.body.email }, "shhhhh"); //generating a token using email
    const hash = bcrypt.hashSync(req.body.password, 10); //hashing the password saltRounds = 10
    const user = new UserAuth(req.body);
    user.token = token;
    user.password = hash;
    const resp = await user.save();
    res.status(201).json({
      code: signupUserCode,
      message: signupUserMsg,
    });
  } catch (error) {
    if (error.code === 11000) {
      console.log("error", error);
      res.status(400).json({
        error: `Duplicate key error. ${error.keyValue.email} already exists.`,
      });
    } else {
      console.log("error", error);
      res.status(400).json(error);
    }
  }
};

exports.loginUser = async (req, res) => {
  try {
    const userResp = await UserAuth.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, userResp?.password); //userResp?.password contains the hash
    if (isAuth) {
      const token = jwt.sign({ email: req.body.email }, "shhhhh"); //generating a new token using email
      userResp.token = token;
      const finalResponse = await userResp.save();
      res.status(201).json({
        code: loginUserCode,
        data: { token: token },
        message: loginUserMsg,
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("error", error);
  }
};
