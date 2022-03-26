const Chat = require("../model/chatModel.js");
const User = require("../model/userModel.js");
const Message = require("../model/messageModel.js");
const messagePost = async (req, res) => {
  if (!req.error) {
    const user = req.user;
    console.log("chat id" + req.body.chatId);
    let messagebody = {
      sender: user._id,
      chat: req.body.chatId,
      content: req.body.content,
    };
    Message.create(messagebody)
      .then(async (message) => {
        message = await message.populate("sender");
        console.log(message);
        message = await message.populate({ path: "chat", model: Chat });
        console.log("hello");
        message = await User.populate(message, {
          path: "chat.users",
        });
        message = await User.populate(message, {
          path: "chat.districtAdmins",
        });
        console.log(message);
        console.log("id:" + messagebody.chat);
        let chat = await Chat.findByIdAndUpdate(messagebody.chat, {
          latestMessage: message,
        }).catch((error) => console.log(error));
        console.log(chat);
        res.status(201).send(message);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(400);
      });
  }
};

module.exports = messagePost;
