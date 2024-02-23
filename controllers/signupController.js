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
    const userinfo = {
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
      jwtToken: await tokenGenerator(user._id, user.aadharNo),
    };

    //  req.io.emit("user-info2", (data2 = { ...userinfo }));
    res.cookie("SESSIONID", userinfo.jwtToken, {
      //  httpOnly: true,
      secure: true,
    });

    // res.redirect(`/user/${userinfo.Name}`);
    //return res.redirect("/Home");
    res.status(200).json({ success: true });
  } else {
    res.status(400);
    throw new Error("failed to create user");
  }
});

module.exports = signupUser;
