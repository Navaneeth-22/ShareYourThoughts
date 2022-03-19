const expressAsyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel.js");

const addUser = async (req, res) => {
  console.log("hgjhg" + req.body);
  if (!req.error) {
    const user = req.user;

    if (user.occupation == "user") {
      const added = Chat.findOneAndUpdate(
        { chatRoomName: user.district + " Main" },
        {
          $push: { users: user._id },
        },
        { new: true }
      ).populate("users", "-password");
      if (!added) {
        res.status(404);
        // throw new Error("Chat Not Found");
      } else {
        res.json(added);
      }
    }
    if (user.occupation == "MLA") {
      const added = Chat.findOneAndUpdate(
        { chatRoomName: user.district + " Main" },
        {
          $push: { users: user._id, districtAdmins: user._id },
        },
        { new: true }
      )

        .populate("users", "-password")
        .populate("districtAdmins", "-password")
        .exec();
      const added1 = Chat.findOneAndUpdate(
        { chatRoomName: user.district + " Road department" },
        {
          $push: { users: user._id, districtAdmins: user._id },
        },
        { new: true }
      )

        .populate("users", "-password")
        .populate("districtAdmins", "-password")
        .exec();
      const added2 = Chat.findOneAndUpdate(
        { chatRoomName: user.district + " Electricity department" },
        {
          $push: { users: user._id, districtAdmins: user._id },
        },
        { new: true }
      )

        .populate("users", "-password")
        .populate("districtAdmins", "-password")
        .exec();
      const added3 = Chat.findOneAndUpdate(
        { chatRoomName: user.district + " Water resource department" },
        {
          $push: { users: user._id, districtAdmins: user._id },
        },
        { new: true }
      )

        .populate("users", "-password")
        .populate("districtAdmins", "-password")
        .exec();
      if (!added || !added1 || !added2 || !added3) {
        res.status(404);
      } else {
        const allChats = {
          added,
          added1,
          added2,
          added3,
        };
        console.log(added, added1, added2, added3);
        res.status(200).json({ success: true });
      }
    }
  }
};

module.exports = addUser;
