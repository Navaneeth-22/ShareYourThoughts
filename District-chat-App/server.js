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
app.use("/images", express.static(__dirname + "public/images"));

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

io.on("connection", function (socket) {
  console.log(socket.id);

  socket.on("sendNotification", function (details) {
    socket.broadcast.emit("sendNotification", details);
  });
});
