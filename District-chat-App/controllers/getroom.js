const Chat = require("../model/chatModel");

const getroom = async (req, res) => {
  const user = req.user;
  var chats;

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
  } else res.render("error", { message: "we have no chat room for you" });
};

module.exports = getroom;
