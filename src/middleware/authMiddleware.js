const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  //method of initializing middleware
  const token = req.get("Authorization"); //as log contains = Bearer eyJhbGciOiJ
  const postmanToken = token?.split(" ")[1]; 
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
