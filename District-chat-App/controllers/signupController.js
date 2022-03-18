const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const tokenGenerator = require("../config/tokenGenerator.js");
const signupUser = asyncHandler(async (req, res) => {
  const {
    Name,
    userName,
    email,
    aadharNo,
    dateOfBirth,
    occupation,
    photo,
    district,
    state,
    password,
  } = req.body;
  if (
    !Name ||
    !userName ||
    !email ||
    !aadharNo ||
    !dateOfBirth ||
    !occupation ||
    !district ||
    !state ||
    !password
  ) {
    res
      .status(400)
      .send(
        Name,
        userName,
        email,
        aadharNo,
        dateOfBirth,
        occupation,
        district,
        state,
        password
      );
    throw new Error("Please enter all fields!!");
  }

  const userExists = await User.findOne({ aadharNo });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    Name,
    userName,
    email,
    aadharNo,
    dateOfBirth,
    occupation,
    photo,
    district,
    state,
    password,
  });

  if (user) {
    res
      .status(201)
      .json({
        id: user._id,
        Name: user.Name,
        userName: user.userName,
        email: user.email,
        aadharNo: user.aadharNo,
        dateOfBirth: user.dateOfBirth,
        occupation: user.occupation,
        photo: user.photo,
        district: user.district,
        state: user.state,
        jwtToken: tokenGenerator(user._id, user.aadharNo),
      })
      .render("Home", user);
  } else {
    res.status(400);
    throw new Error("failed to create user");
  }
});

module.exports = signupUser;
