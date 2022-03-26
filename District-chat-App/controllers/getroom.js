const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Message = require("../model/messageModel");

const getroom = async (req, res) => {
  const user = req.user;
  /* var chats;

  chats = await Chat.find({ district: user.district });

  // res.json({ success: true });
  console.log(chats);

  let i = 0;
  let occupation = user.occupation;

  if (occupation != "MLA" && occupation != "user") {
    let str2 = chats.filter(
      (x) =>
        x.chatRoomName === user.district + " " + occupation ||
        x.chatRoomName === user.district + " Main"
    );
    let str = str2.map(function (x) {
      return {
        chatName: x.chatRoomName,
        chatId: x._id,
      };
    });
    console.log(str);
    res.json(str);
  } else if (occupation === "MLA") {
    let str = chats.map(function (x) {
      return {
        chatName: x.chatRoomName,
        chatId: x._id,
      };
    });
    console.log(str);
    res.json(str);
  } else if (occupation === "user") {
    let str2 = chats.filter((x) => x.chatRoomName === user.district + " Main");
    let str = str2.map(function (x) {
      return {
        chatName: x.chatRoomName,
        chatId: x._id,
      };
    });
    console.log(str);
    res.json(str);
  } else res.render("error", { message: "we have no chat room for you" });*/
  Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users")
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
