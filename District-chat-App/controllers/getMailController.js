const Chat = require("../model/chatModel.js");
const User = require("../model/userModel.js");
const Mail = require("../model/mailModel.js");

const getComplaints = async (req, res) => {
  const user = req.user;
  const chatId = req.id;
  console.log("chat id was ------------" + chatId);
  try {
    if (chatId === null || chatId === undefined) {
      const mails = await Mail.find({ district: user.district })
        .populate("sentBy")
        .populate({ path: "room", model: Chat })
        .exec();
      console.log(mails);
      res.status(200).json(mails);
    } else {
      console.log(
        "iam here----------------------------------------------------------"
      );
      const mails = await Mail.find({ room: chatId })
        .populate("sentBy")
        .populate({ path: "room", model: Chat })
        .exec();
      console.log(mails);
      res.status(200).json(mails);
    }
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

module.exports = getComplaints;
