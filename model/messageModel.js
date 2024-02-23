const mongoose = require("mongoose");
const Chat = require("./chatModel");
const User = require("./userModel");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    complaint: {
      heading: {
        type: String,
        trim: true,
      },
      content: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    
    boolComp: {
      type: Boolean,
    },
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
