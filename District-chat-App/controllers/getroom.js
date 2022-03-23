const Chat = require("../model/chatModel");

const getroom = async (req, res) => {
  const user = req.user;
  var chats;
  if (user.occupation === "MLA") {
    chats = await Chat.find({ district: user.district });
  }
  // res.json({ success: true });
  console.log(chats);
  let chatInfo = [
    {
      chatName: String,
      chatId: String,
    },
  ];
  let i = 0;
  let str = chats.map(function (x) {
    return {
      chatName: x.chatRoomName,
      chatId: x._id,
    };
  });
  console.log(str);
  res.json(str);
};

module.exports = getroom;
