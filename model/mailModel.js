const mongoose = require("mongoose");
const Chat = require("./chatModel");
const User = require("./userModel");

const mailSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      //required: true,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    important: {
      type: Boolean,
      default: false,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    complaint: {
      heading: {
        type: String,
        trim: true,
      },
      complaint: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    district: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
