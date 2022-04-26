const express = require("express");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../model/userModel.js");
const app = express();
__dirname = path.resolve();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("tok" + token);

      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("room id is " + req.body.RoomId);
      console.log(req.user);

      next();
    } catch (error) {
      req.error = "Not authorized, token failed";
      console.log(req.error);
      // res.redirect("http://localhost:3000/api/user/login");
      next();
      // throw new Error("Not authorized, token failed");
    }
  }

  /* if (!token) {
    req.error = "Not authorized, no token";
    //res.redirect("/error");
    next();
    //throw new Error("Not authorized, no token");
  }*/
});

module.exports = protect;
