const Chat = require("../model/chatModel.js");
const User = require("../model/userModel.js");
const Mail = require("../model/mailModel.js");

const getAllUsers = async (req, res) => {
  let user = req.user;
  console.log("user is *******************" + user);
  if (user.occupation === "MLA") {
    let users = await User.find({ district: user.district })
      .select("-password")
      .exec();
    console.log(users);
    res.status(200).json(users);
  } else {
    res.status(400);
  }
};
module.exports = getAllUsers;
