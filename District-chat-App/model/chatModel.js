const { localsName } = require("ejs");

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatRoomName: {
      type: String,
      required: true,
      unique: true,
    },
    districtAdmins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    district: {
      type: String,
      required: true,
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
