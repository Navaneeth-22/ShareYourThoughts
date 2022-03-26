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
  gettingChatData();

  /* if (sessionId) {
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
          console.log("chat is : " + x);
          $("#grouplist").append(
            `<li>
            <a href="#" class = "groups" style="text-decoration: none" id=${
              x._id
            }>
              <div class="card card-container" style="margin: 5px">
                <div class="card-body">
                  <div class="card-text custom-card-css">
                    <div class="d-flex">
                      <div
                        class="position-relative align-self-center me-3 ms-0"
                      >
                        <img
                          src=${
                            x?.latestMessage?.sender?.photo
                              ? x?.latestMessage?.sender?.photo
                              : "/images/avatar-1.jpg"
                          }
                          class="rounded-circle avatar-xs"
                          alt=""
                        />
                      </div>

                      <div class="flex-grow-1 overflow-hidden">
                        <h5
                          class="text-family text-truncate font-size-15 mb-1"
                        >
                        ${
                          x?.latestMessage?.sender?.Name
                            ? x?.latestMessage?.sender?.Name
                            : "Patrick Hendricks"
                        }
                        </h5>
                        <p
                          class="chat-user-message text-family text-truncate mb-0"
                        >
                        ${
                          x?.latestMessage?.content
                            ? x?.latestMessage?.content
                            : "Hey! there I'm available"
                        }
                         
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
  }*/
  $("body").show();
});

function getAllMessages(chatId) {
  let sessionId = getCookie("SESSIONID");
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/${chatId}/messages`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },

    success: function (data) {
      console.log(data);
      appendmessageHtml(data);
    },
    error: function (data) {
      alert("Login Failed" + data.message);
    },
  });
}

$("body").on("click", ".groups", function () {
  selectedChatId = $(this).attr("id");
  getAllMessages(selectedChatId);
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

function gettingChatData() {
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
        $("#grouplist").empty();
        data.forEach(function (x) {
          console.log("chat is : " + x);

          $("#grouplist").append(
            `<li>
            <a href="#" class = "groups" style="text-decoration: none" id=${
              x._id
            }>
              <div class="card card-container" style="margin: 5px">
                <div class="card-body">
                  <div class="card-text custom-card-css">
                    <div class="d-flex">
                      <div
                        class="position-relative align-self-center me-3 ms-0"
                      >
                        <img
                          src=${
                            x?.latestMessage?.sender?.photo
                              ? x?.latestMessage?.sender?.photo
                              : "/images/avatar-1.jpg"
                          }
                          class="rounded-circle avatar-xs"
                          alt=""
                        />
                      </div>

                      <div class="flex-grow-1 overflow-hidden">
                        <h5
                          class="text-family text-truncate font-size-15 mb-1"
                        >
                        ${
                          x?.latestMessage?.sender?.Name
                            ? x?.latestMessage?.sender?.Name
                            : "Patrick Hendricks"
                        }
                        </h5>
                        <p
                          class="chat-user-message text-family text-truncate mb-0" style = "line-break :anywhere;"
                        >
                        ${
                          x?.latestMessage?.content
                            ? x?.latestMessage?.content.substr(0, 15) + "..."
                            : "Hey! there I'm available"
                        }
                         
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
}
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
        gettingChatData();
        $("#inputmessageId").val("");
      },
      error: function (data) {
        alert("Could not send message");
        $("#inputmessageId").val(content);
        return;
      },
    });
  }
}

const appendmessageHtml = (data) => {
  $(".chatMessages").empty();
  let leftMessage;
  let rightMessage;
  var today = new Date();

  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  data.forEach((x) => {
    if (x.sender._id === userLoggedIn._id) {
      leftMessage = 1;
      rightMessage = 0;
    } else {
      leftMessage = 0;
      rightMessage = 1;
    }
    $(".chatMessages").append(
      `<li class=${rightMessage === 1 ? "left-message" : "right-message"}>
      <div class="conversation-list">
        <div class="chat-avatar">
          <img
            class="profileimage"
            src=${x?.sender?.photo ? x?.sender?.photo : "/images/avatar-1.jpg"}
            alt=""
          />
        </div>

        <div class="user-chat-content">
          <div class="ctext-wrap">
            <div class="ctext-wrap-content" style="
            max-width: 320px;">
              <p class="mb-0" style= "line-break:anywhere;text-align: justify;">${
                x?.content
              }</p>
              <p class="chat-time mb-0">
                <i class="ri-time-line align-middle"></i>
                <span class="align-middle">${time}</span>
              </p>
            </div>
            <div class="dropdown align-self-start">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="ri-more-2-fill"></i>
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#"
                  >Copy
                  <i
                    class="ri-file-copy-line float-end text-muted"
                  ></i
                ></a>
                <a class="dropdown-item" href="#"
                  >Save
                  <i
                    class="ri-save-line float-end text-muted"
                  ></i
                ></a>
                <a class="dropdown-item" href="#"
                  >Forward
                  <i
                    class="ri-chat-forward-line float-end text-muted"
                  ></i
                ></a>
                <a class="dropdown-item" href="#"
                  >Delete
                  <i
                    class="ri-delete-bin-line float-end text-muted"
                  ></i
                ></a>
              </div>
            </div>
          </div>

          <div class="conversation-name">${x.sender.Name}</div>
        </div>
      </div>
    </li>`
    );
  });
};
