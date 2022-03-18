var socketio = io("http://localhost:3000");
socketio.on("user-info2", (data) => {
  console.log(data);
  sessionStorage.setItem("user-info2", JSON.stringify(data));
});
