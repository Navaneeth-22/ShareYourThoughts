function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
$(window).on("load", function () {
  //  $(".mainPage").hide();
  //  setTimeout(removeLoader, 5000);
  let sessionId = getCookie("SESSIONID");
  if (sessionId) {
    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/addUser",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionId}`,
      },
      success: function (data) {
        //localStorage.token = data.token;
        // window.location.replace("http://localhost:3000/Home");
        alert("user added " + sessionId);
        console.log(data);
      },
      error: function (data) {
        alert("there was an error in adding user");
      },
    });
  }
  console.log(sessionId);
  if (!sessionId) {
    $(".upward-trans").append(
      '<li><a href="http://localhost:3000/api/user/login" class="nav-link dabba">Login</a></li>'
    );
    $(".upward-trans").append(
      '<li><a href="http://localhost:3000/api/user/signup" class="nav-link dabba">signup</a></li>'
    );
  } else {
    $(".upward-trans").append(
      '<li><a href="http://localhost:3000/api/user/profile" class="nav-link dabba">Profile</a></li>'
    );
    $(".upward-trans").append(
      '<li><a href="http://localhost:3000/adminPortal" class="nav-link dabba">AdminPortal</a></li>'
    );
    $(".upward-trans").append(
      '<li><a href="http://localhost:3000/api/gmail"  class="nav-link dabba">Complaint</a></li>'
    );
    $(".upward-trans").append(
      '<li><a href="#" onclick="logout()" class="nav-link dabba">Logout</a></li>'
    );
  }
  if (sessionId) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/chatrooms",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionId}`,
      },
      success: function (data) {
        //localStorage.token = data.token;
        data.forEach(function (x) {
          urlfor = `http://localhost:3000/api/chat`;
          $(".cards-container").append(
            `<div class="cards">
      <div><img src="/images/message.png" alt="" /></div>
      <div class="heading">${x.chatRoomName}</div>
      <div class="text">
        User can make full use of chat rooms and send all the problems
        to respective organisation.
        <a href=${urlfor}>chat</a>
      </div>
    </div>`
          );
        });
        console.log(data);
      },
      error: function (data) {
        alert("Login Failed" + data.message);
      },
    });
  }
  $("body").show();
});
// function removeLoader() {
//   $("#loadingDiv").fadeOut(500, function () {
//     // fadeOut complete. Remove the loading div
//     $("#loadingDiv").remove(); //makes page more lightweight
//     $(".mainPage").show();
//   });
// }

function logout() {
  $.removeCookie("SESSIONID");
  window.location.reload();
}
