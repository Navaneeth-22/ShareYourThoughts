const Chat = require("../model/chatModel.js");
const User = require("../model/userModel.js");
const Mail = require("../model/mailModel.js");

const sentComplaints = async (req, res) => {
  const user = req.user;
  try {
    const mails = await Mail.find({ sentBy: user._id })
      .populate("sentBy")
      .populate({ path: "room", model: Chat })
      .exec();
    console.log(mails);
    res.status(200).json(mails);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};
module.exports = sentComplaints;
