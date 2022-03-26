const Chat = require("../model/chatModel");
const User = require("../model/userModel");
const Message = require("../model/messageModel");

const getMessages = async (req, res) => {
  const user = req.user;
  const chatId = req.id;
  try {
    const messages = await Message.find({ chat: chatId }).populate("sender");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

module.exports = getMessages;
