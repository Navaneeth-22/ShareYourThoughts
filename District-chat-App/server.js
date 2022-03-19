const loginRoute = require("./routes/loginRoute.js");
const signupRoute = require("./routes/signupRoute.js");
const addUserRoute = require("./routes/addUserRoute.js");
const protect = require("./middlewares/authorization.js");
const createChatRoom = require("./config/createChatRooms.js");
const Chat = require("./model/chatModel.js");
const connectDB = require("./config/dbConnect.js");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyparser = require("body-parser");

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

app.use(bodyparser.json());

const PORT = 3000;
const server = app.listen(PORT, () =>
  console.log("Server listening on port " + PORT)
);
var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//app.set("socket.io", io);

app.use((req, res, next) => {
  req.io = io;
  return next();
});
//app.use("/public", express.static(path.join(__dirname, "/public/")));
console.log(path.join(__dirname, "/public/"));
app.use("/api/user/login", loginRoute);
app.use("/api/user/signup", signupRoute);
app.use("/addUser", addUserRoute);
/*app.get("/Login", (req, res) => {
  res.status(200).render("login");
});*/

app.get("/rest", protect, (req, res) => {
  res.status(200).send("api  is running");
  next();
});
/*app.get("/chatId/", protect, async (req, res) => {
  const district = req.user.district;
  const occupation = req.user.occupation;
  if (occupation == "user") {
    const chat = await Chat.find({ chatRoomName: district + " Main" });
    const chatId = chat._id;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: req.user } },
      { new: true }
    );
    if (!added) {
      res.status(404);

      res.render("erorr", "chat was not found");
    }
  }
  if (occupation == "MLA") {
    const chat = await Chat.find({ district: district });
    chat.forEach(async (x) => {
      const chatId = x._id;
      const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: req.user },

          $push: { districtAdmins: req.user },
        },
        { new: true }
      );

      if (!added) {
        res.status(404);

        res.render("erorr", "chat was not found");
      }
    });
  }
  if (occupation == "") {
    const { chat } = await Chat.find({ chatRoomName: district + " Main" });
    const chatId = chat._id;
    const added = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: req.user } },
      { new: true }
    );
    if (!added) {
      res.status(404);

      res.render("erorr", "chat was not found");
    }
  }
});*/
app.get("/error/", protect, (req, res) => {
  console.log(req.error);
  res.render("error", { message: req.error });
  next();
});
/*app.get("/", protect, (req, res, next) => {
  console.log("home" + req.error);
  req.User = req.user;
  res.status(200).redirect("/Home");
});*/

app.get("/home1", protect, (req, res) => {
  // app.set("user", req.user);
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

io.on("connection", function (socket) {
  console.log(socket.id);

  socket.on("sendNotification", function (details) {
    socket.broadcast.emit("sendNotification", details);
  });
});
