let connected = false;

let user;
var socketio = io("http://localhost:3000");

socketio.on("success", (id) => {
  console.log("user joined in" + id + ":" + JSON.stringify(userLoggedIn));
  connected = true;
});

socketio.on("message arrived", (message) => {
  addCurrentMessage(message);
  scrollToBottom(true);
});
function connection() {
  console.log("ser" + userLoggedIn);
  socketio.emit("make connection", userLoggedIn);
}

let interval = setInterval(() => {
  if (userLoggedIn === undefined || userLoggedIn === null) {
    console.log("undefined   user");
  } else {
    connection();
    clearInterval(interval);
  }
}, 1000);
