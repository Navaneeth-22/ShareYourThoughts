const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Message = require("../model/messageModel");

const getroom = async (req, res) => {
  const user = req.user;

  Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users")
    .populate("districtAdmins")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (data) => {
      data = await User.populate(data, { path: "latestMessage.sender" });
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
    });
};

module.exports = getroom;
