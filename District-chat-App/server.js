const loginRoute = require("./routes/loginRoute.js");
const signupRoute = require("./routes/signupRoute.js");
const addUserRoute = require("./routes/addUserRoute.js");
const protect = require("./middlewares/authorization.js");
const createChatRoom = require("./config/createChatRooms.js");
const Chat = require("./model/chatModel.js");
const connectDB = require("./config/dbConnect.js");
const getchatRoute = require("./routes/getchatRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const complaintRoute = require("./routes/complaintRoute.js");
const getMessagesRoute = require("./routes/getMessagesRoute.js");
const getAllUsersRoute = require("./routes/getAllUsersRoute.js");
const starredMailRoute = require("./routes/starredMailRoute.js");
const getMailRoute = require("./routes/getMailRoute.js");
const sentMailsRoute = require("./routes/sentMailsRoute.js");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyparser = require("body-parser");
const { request } = require("express");
const { Socket } = require("socket.io-client");
const messagePost = require("./controllers/messageController.js");
const Mail = require("./model/mailModel.js");

__dirname = path.resolve();

console.log(__dirname);

dotenv.config();

connectDB();
createChatRoom();

const app = express();
app.use(require("cors")());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));

app.use(bodyparser.json());

const PORT = 3000;
const server = app.listen(PORT, () =>
  console.log("Server listening on port " + PORT)
);
/*var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});*/
const io = require("socket.io")(server, { pingTimeout: 60000 });

app.use((req, res, next) => {
  req.io = io;
  return next();
});

console.log(path.join(__dirname, "/public/"));
app.use("/api/user/login", loginRoute);
app.use("/api/user/signup", signupRoute);
app.use("/api/user/profile", (req, res) => {
  res.render("modifiedprofile");
});
app.use("/addUser", addUserRoute);
app.use("/chatrooms", getchatRoute);
app.get("/api/chat", (req, res) => {
  // res.redirect("/api/user/login");
  res.render("chatpage");
});
app.get("/api/gmail", (req, res) => {
  // res.redirect("/api/user/login");
  res.render("gmail");
});
app.use("/api/postMessages", messageRoute);
app.get("/:chatId/messages", (req, res, next) => {
  const id = req.params.chatId;
  console.log("id was " + id);
  req.id = id;
  next();
});
app.get("/:roomId/inbox", (req, res, next) => {
  const id = req.params.roomId;
  console.log("id was " + id);
  req.id = id;
  next();
});
app.use("/api/sendComplaint", complaintRoute);
app.use("/:chatId/messages", getMessagesRoute);
app.use("/:roomId/inbox", getMailRoute);
app.use("/sentMails", sentMailsRoute);
//app.use("/starredMails", sentMailsRoute);
app.use("/getAllUsers", getAllUsersRoute);
app.get("/:mailId/updateStarred", (req, res, next) => {
  let id = req.params.mailId;
  req.id = id;
  next();
});
app.use("/:mailId/updateStarred", starredMailRoute);
app.get("/getUserInfo", protect, (req, res) => {
  if (!req.error) {
    res.status(200).json(req.user);
  } else res.render("error", { message: req.error });
});
app.get("/rest", protect, (req, res) => {
  console.log("error" + req.error);
  if (req.error) {
    res.render("error", { message: req.error });
  } else res.status(200).send("api  is running");
});

app.get("/error/", protect, (req, res) => {
  console.log(req.error);
  res.render("error", { message: req.error });
  next();
});

app.get("/home1", protect, (req, res) => {
  if (req.user) {
    let name = req.user.Name;
    console.log("name is " + name);
    const user = {
      ...req.user,
    };
  } else {
    res.redirect("/api/user/login");
  }

  return res.json(user);
});
app.get("/Home", (req, res) => {
  return res.render("home");
});
app.get("/adminPortal", (req, res) => {
  res.render("adminPortal");
});
io.on("connection", function (socket) {
  console.log(socket.id);

  socket.on("make connection", (user) => {
    console.log("user through socket" + JSON.stringify(user));
    socket.join(user._id);
    socket.emit("success", user._id);
  });
  socket.on("join chat", (info) => {
    console.log("joining chat room with id" + JSON.stringify(info.chatId));
    socket.join(info.chatId);
    socket.in(info.chatId).emit("joined chat", info);
  });
  socket.on("typing", (info) => {
    console.log("typign in " + info.chatId);
    socket.in(info.chatId).emit("typing", info);
  });
  socket.on("stop typing", (chatId) => {
    socket.in(chatId).emit("stop typing");
  });

  socket.on("new message", (message) => {
    let chat = message.chat;
    if (!chat.users) {
      console.log("This chat doesn't contains users" + message.chat._id);
    }

    chat.users.forEach((user) => {
      if (user._id === message.sender._id) {
        return;
      }
      socket.in(user._id).emit("message arrived", message);
    });
  });
  socket.on("new mail", (mail) => {
    let chat = mail.room;

    console.log("in socket io " + chat.chatRoomName);
    if (!chat.users) {
      console.log("This chat doesn't contains users" + mail.chat._id);
    }

    chat.users.forEach((user) => {
      console.log("user is " + user._id);
      socket.in(user).emit("mail arrived", mail);
    });
  });

  socket.on("sendNotification", function (details) {
    socket.broadcast.emit("sendNotification", details);
  });
});
