const axios = require("axios");
const Chat = require("../../model/chatModel.js");
const Message = require("../../model/messageModel.js");

const sendMessage = async (data) => {};

const outputMessages = async (data) => {
  const chatRoomInfo = JSON.parse(localStorage.getItem("chatInfo"));

  const chatId = chatRoomInfo.chatId;

  try {
    let messages = await Message.find({ chatId });
    messages = await messages
      .populate("sender")
      .populate("chat")
      .populate("readBy");
  } catch (error) {
    console.log(error);
    //return alert onto the page
  }

  const userLoggedIn = JSON.parse(localStorage.getItem("user-info"));

  messages.forEach((x) => {
    if (x.sender._id == userLoggedIn.id) {
    }
    const node = document.createElement("li");

    const parent = document.getElementById("messageContainer");
  });
};
