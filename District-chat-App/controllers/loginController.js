const User = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const tokenGenerator = require("../config/tokenGenerator.js");

const authUser = expressAsyncHandler(async (req, res, next) => {
  const { aadharNo, password } = req.body;
  /*if (!aadharNo || !password) {
    res.status(401);
    throw new Error("please provide fields!!");
  }*/
  const user = await User.findOne({ aadharNo }).exec();
  if (user) {
    const verified = await bcrypt.compare(password, user.password);
    if (verified) {
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

      /* res.status(200).json({
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
      });*/
      return res.json({ success: true });
    } else {
      res
        .status(200)
        .render("login", (data = { message: "wrong credwentials" }));
    }
    // res.status(200).render("login", (data = { ...userinfo }));
  }
});

module.exports = authUser;
