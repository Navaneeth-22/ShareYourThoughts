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
let userLoggedIn;
let selectedChatId;

$(document).ready(() => {
  let sessionId = getCookie("SESSIONID");

  if (sessionId) {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/getUserInfo",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionId}`,
      },
      success: function (data) {
        userLoggedIn = data;
        console.log(data);
      },
      error: function (data) {
        alert("Login Failed" + data.message);
      },
    });
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/chatrooms",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionId}`,
      },
      success: function (data) {
        data.forEach(function (x) {
          $("#grouplist").append(
            `<li>
            <a href="#" class = "groups" style="text-decoration: none" id=${x._id}>
              <div class="card card-container" style="margin: 5px">
                <div class="card-body">
                  <div class="card-text custom-card-css">
                    <div class="d-flex">
                      <div
                        class="position-relative align-self-center me-3 ms-0"
                      >
                        <img
                          src="/images/avatar-2.jpg"
                          class="rounded-circle avatar-xs"
                          alt=""
                        />
                      </div>

                      <div class="flex-grow-1 overflow-hidden">
                        <h5
                          class="text-family text-truncate font-size-15 mb-1"
                        >
                          Patrick Hendricks
                        </h5>
                        <p
                          class="chat-user-message text-family text-truncate mb-0"
                        >
                          Hey! there I'm available
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style="padding: 5px; margin-top: 10px">
                    <h5 class="card-title">${x.chatRoomName}</h5>
                  </div>
                </div>
              </div>
            </a>
          </li>`
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
$("body").on("click", ".groups", function () {
  selectedChatId = $(this).attr("id");
  console.log("hello");
  console.log(selectedChatId);
});

$("#messageSendBut").click(() => {
  sendMessage();
});
$("#inputmessageId").keydown((event) => {
  // updateTyping();

  if (event.which === 13) {
    sendMessage();
    return false;
  }
});

function sendMessage() {
  let content = $("#inputmessageId").val().trim();
  let sessionId = getCookie("SESSIONID");
  if (content != "") {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/postMessages",
      data: JSON.stringify({
        content: content,
        chatId: selectedChatId,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionId}`,
      },
      success: function (message) {
        console.log(message);
      },
      error: function (data) {
        alert("Could not send message");
        $("#inputmessageId").val(content);
        return;
      },
    });
  }
}

const appendmessageHtml = () => {};
