const User = require("../model/userModel.js");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const tokenGenerator = require("../config/tokenGenerator.js");

const authUser = async (req, res, next) => {
  const { aadharNo, password } = req.body;

  console.log("aadhar" + req.body.aadharNo, req.body.password);
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

      // res.redirect(`/user/${userinfo.Name}`);
      //  return res.json({ success: true });
      res.redirect("/Home");
    } else {
      res.status(401).json({ message: "Wrong user or password" });
      console.log("failed login");
      return;
    }
  } else {
    res.status(401).json({ message: "Wrong user or password" });
    console.log("failed login");
    return;
  }
};

module.exports = authUser;
