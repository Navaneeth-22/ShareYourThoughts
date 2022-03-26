const expressAsyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel.js");
const User = require("../model/userModel");

const addUser = async (req, res) => {
  console.log("hgjhg" + JSON.stringify(req.body));
  if (!req.error) {
    const user = req.user;
    console.log("user is" + user);
    const alreadyAdded = await Chat.findOne({
      users: { $elemMatch: { $eq: req.user._id } },
    }).populate("users", "-password");

    if (!alreadyAdded) {
      console.log("klkl");
      if (user.occupation === "user") {
        console.log("added" + alreadyAdded);
        console.log("first one exev");

        const added = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Main" },
          {
            $push: { users: user._id },
          },
          { new: true }
        )
          .populate("users", "-password")
          .exec();
        if (!added) {
          res.status(404);
          // throw new Error("Chat Not Found");
        } else {
          console.log("new one is " + added);
          res.status(200).json({ success: true });
        }
      } else if (user.occupation == "MLA") {
        console.log("2 one exev");
        const added = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Main" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        const added1 = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Road department" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        const added2 = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Electricity department" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        const added3 = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Water resource department" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        if (!added || !added1 || !added2 || !added3) {
          res.status(404);
        } else {
          const allChats = {
            added,
            added1,
            added2,
            added3,
          };
          console.log(added, added1, added2, added3);
          res.status(200).json({ success: true });
        }
      } else if (user.occupation != "MLA" && user.occupation != "user") {
        console.log("this one executed");
        console.log(user.occupation);
        console.log(user.district + " " + user.occupation);
        const added = await Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Main" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        const added1 = await Chat.findOneAndUpdate(
          { chatRoomName: user.district + " " + user.occupation },
          {
            $push: { users: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();

        if (!added || !added1) {
          res.status(404);
        } else {
          const allChats = {
            added,
            added1,
          };
          console.log(
            "first one added is " + added,
            "second one added is " + added1
          );
          res.status(200).json({ success: true });
        }
      }
    }

    /* if (alreadyAdded) {
      console.log("klkl");
      if (user.occupation == "user") {
        console.log("added" + alreadyAdded);

        const added = Chat.fin(
          { chatRoomName: user.district + " Main" },
          {
            $push: { users: user._id },
          },
          { new: true }
        )
          .populate("users", "-password")
          .exec();
        if (!added) {
          res.status(404);
          // throw new Error("Chat Not Found");
        } else {
          console.log("new one is " + added);
          res.status(200).json({ success: true });
        }
      } else if (user.occupation == "MLA") {
        const added = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Main" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        const added1 = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Road department" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        const added2 = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Electricity department" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        const added3 = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Water resource department" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        if (!added || !added1 || !added2 || !added3) {
          res.status(404);
        } else {
          const allChats = {
            added,
            added1,
            added2,
            added3,
          };
          console.log(added, added1, added2, added3);
          res.status(200).json({ success: true });
        }
      } else {
        const added = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " Main" },
          {
            $push: { users: user._id, districtAdmins: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();
        const added1 = Chat.findOneAndUpdate(
          { chatRoomName: user.district + " " + user.occuption },
          {
            $push: { users: user._id },
          },
          { new: true }
        )

          .populate("users", "-password")
          .populate("districtAdmins", "-password")
          .exec();

        if (!added || !added1) {
          res.status(404);
        } else {
          const allChats = {
            added,
            added1,
          };
          console.log(added, added1);
          res.status(200).json({ success: true });
        }
      }
    }*/
  }
};

module.exports = addUser;
