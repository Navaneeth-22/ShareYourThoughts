const Chat = require("../model/chatModel.js");
const User = require("../model/userModel.js");

async function createChatRoom() {
  let disAp = ["Kadapa", "Anantapur", "Chittoor", "Krishna"];

  disAp.forEach(async (x) => {
    const chat = await Chat.findOne({ district: x });
    if (!chat) {
      await Chat.create({
        chatRoomName: x + " Main",
        district: x,
        state: "Andhra Pradesh",
        latestMessage: null,
      });
      await Chat.create({
        chatRoomName: x + " Road department",
        district: x,
        state: "Andhra Pradesh",
        latestMessage: null,
      });
      await Chat.create({
        chatRoomName: x + " Electricity department",
        district: x,
        state: "Andhra Pradesh",
        latestMessage: null,
      });
      await Chat.create({
        chatRoomName: x + " Water resource department",
        district: x,
        state: "Andhra Pradesh",
        latestMessage: null,
      });
    }
  });
}

module.exports = createChatRoom;
