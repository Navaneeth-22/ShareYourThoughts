const Chat = require("../model/chatModel.js");
const User = require("../model/userModel.js");
const Mail = require("../model/mailModel");
const complaintPost = async (req, res) => {
  if (!req.error) {
    const user = req.user;
    let messagebody;
    // console.log("chat id" + req.body.chatId);

    const chat = await Chat.findById(req.body.room).exec();
    messagebody = {
      room: chat._id,
      complaint: {
        heading: req.body.heading,
        complaint: req.body.complaint,
        address: req.body.address,
      },
      sentBy: user._id,
      district: user.district,
    };

    Mail.create(messagebody)
      .then(async (message) => {
        message = await message.populate("sentBy");
        console.log(message);
        message = await message.populate({ path: "room", model: Chat });
        console.log("hello");
        message = await User.populate(message, {
          path: "chat.users",
        });
        message = await User.populate(message, {
          path: "chat.districtAdmins",
        });
        console.log(message);
        console.log("id:" + messagebody.chat);

        res.status(201).send(message);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(400);
      });
  }
};

module.exports = complaintPost;
