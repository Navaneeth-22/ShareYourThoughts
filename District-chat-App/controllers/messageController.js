const Chat = require("../model/chatModel.js");
const User = require("../model/userModel.js");
const Message = require("../model/messageModel.js");
const messagePost = async (req, res) => {
  if (!req.error) {
    const user = req.user;
    let messagebody;
    console.log("chat id" + req.body.chatId);
    if (req.body.boolComp === false) {
      messagebody = {
        sender: user._id,
        chat: req.body.chatId,
        content: req.body.content,
        boolComp: req.body.boolComp,
      };
    } else {
      messagebody = {
        sender: user._id,
        chat: req.body.chatId,
        complaint: {
          heading: req.body.heading,
          content: req.body.complaint,
          address: req.body.address,
        },
        boolComp: req.body.boolComp,
      };
    }

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
