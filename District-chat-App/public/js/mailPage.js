let userLoggedIn;
let selectedChatId;
let inboxMails;
let sentMails;
let starredMails;
let importantMails;
let mainId;
let waterId;
let roadId;
let electricityId;

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

$(document).ready(() => {
  gettingChatData();
  console.log(mainId, waterId, roadId, electricityId);
  $("body").show();
  getInboxMails(mainId);
  $(".emailRow").show();
});
$("body").on("click", ".emailRow", function () {
  let mail = $(this).attr("id");
  console.log(mail + "mail id is");
  console.log(inboxMails);
  let com;
  if ($("#inbox").hasClass("sidebarOption_active")) {
    inboxMails.map((x) => {
      if (x._id === mail) {
        $(".mailBut").click();
        if (x.room.chatRoomName.includes("Main"))
          $(".complaintSelect select").val("Main");
        else if (x.room.chatRoomName.includes("Road"))
          $(".complaintSelect  select").val("Road department");
        else if (x.room.chatRoomName.includes("Water"))
          $(".complaintSelect  select").val("Water resource department");
        else $(".complaintSelect  select").val("Electricity department");
        $("#header").val(`${x.complaint.heading}`);
        $("#complaint").val(`${x.complaint.complaint}`);
        $("#address").val(`${x.complaint.address}`);
      }
    });
  } else if ($("#sentByHim").hasClass("sidebarOption_active")) {
    sentMails.map((x) => {
      if (x._id === mail) {
        $(".mailBut").click();
        if (x.room.chatRoomName.includes("Main"))
          $(".complaintSelect select").val("Main");
        else if (x.room.chatRoomName.includes("Road"))
          $(".complaintSelect  select").val("Road department");
        else if (x.room.chatRoomName.includes("Water"))
          $(".complaintSelect  select").val("Water resource department");
        else $(".complaintSelect  select").val("Electricity department");
        $("#header").val(`${x.complaint.heading}`);
        $("#complaint").val(`${x.complaint.complaint}`);
        $("#address").val(`${x.complaint.address}`);
      }
    });
  } else {
    sentMails.map((x) => {
      if (x._id === mail) {
        $(".mailBut").click();
        if (x.room.chatRoomName.includes("Main"))
          $(".complaintSelect select").val("Main");
        else if (x.room.chatRoomName.includes("Road"))
          $(".complaintSelect  select").val("Road department");
        else if (x.room.chatRoomName.includes("Water"))
          $(".complaintSelect  select").val("Water resource department");
        else $(".complaintSelect  select").val("Electricity department");
        $("#header").val(`${x.complaint.heading}`);
        $("#complaint").val(`${x.complaint.complaint}`);
        $("#address").val(`${x.complaint.address}`);
      }
    });
  }
});
function addCurrentMail(x) {
  // let sessionId = getCookie("SESSIONID");
  if (x.room.chatRoomName.includes("Main")) {
    if ($(".mainSection").hasClass("section_selected")) {
      $(".emailList_list").append(` <div class="emailRow" id=${x._id}>
    <div class="emailRow_options">
      <input type="checkbox" />
      <span class="material-icons starSymbol"> star_border </span>
      <span class="material-icons"> label_important </span>
    </div>
    <h3 class="emailRow_title">${x.sentBy.Name}</h3>
    <div class="emaiRow_message">
      <h4>${x.complaint.heading}</h4>
    </div>
    <p class="emailRow_time">${x.createdAt}</p>
  </div>`);
    }
  }
  if (x.room.chatRoomName.includes("Water")) {
    if ($(".waterSection").hasClass("section_selected")) {
      $(".emailList_list").prepend(` <div class="emailRow" id=${x._id}>
    <div class="emailRow_options">
      <input type="checkbox" />
      <span class="material-icons starSymbol"> star_border </span>
      <span class="material-icons"> label_important </span>
    </div>
    <h3 class="emailRow_title">${x.sentBy.Name}</h3>
    <div class="emaiRow_message">
      <h4>${x.complaint.heading}</h4>
    </div>
    <p class="emailRow_time">${x.createdAt}</p>
  </div>`);
    }
  }
  if (x.room.chatRoomName.includes("Road")) {
    if ($(".roadSection").hasClass("section_selected")) {
      $(".emailList_list").prepend(` <div class="emailRow" id=${x._id}>
    <div class="emailRow_options">
      <input type="checkbox" />
      <span class="material-icons starSymbol"> star_border </span>
      <span class="material-icons"> label_important </span>
    </div>
    <h3 class="emailRow_title">${x.sentBy.Name}</h3>
    <div class="emaiRow_message">
      <h4>${x.complaint.heading}</h4>
    </div>
    <p class="emailRow_time">${x.createdAt}</p>
  </div>`);
    }
  }
  if (x.room.chatRoomName.includes("Electricity")) {
    if ($(".electricitySection").hasClass("section_selected")) {
      $(".emailList_list").prepend(` <div class="emailRow" id=${x._id}>
    <div class="emailRow_options">
      <input type="checkbox" />
      <span class="material-icons starSymbol"> star_border </span>
      <span class="material-icons"> label_important </span>
    </div>
    <h3 class="emailRow_title">${x.sentBy.Name}</h3>
    <div class="emaiRow_message">
      <h4>${x.complaint.heading}</h4>
    </div>
    <p class="emailRow_time">${x.createdAt}</p>
  </div>`);
    }
  }
}
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
  }

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/chatrooms",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },
    success: function (data) {
      $(".emailList_sections").empty();
      data.forEach(function (x) {
        console.log("chat is : " + x);
        if (x.chatRoomName.includes("Main")) {
          mainId = x._id;
          $(".maindept").attr("id", `${x?._id}`);
          $(".emailList_sections").prepend(
            `<div class="section section_selected mainSection" id="${x?._id}">
            <span class="material-icons"> inbox </span>
            <h4>Main</h4>
          </div>`
          );
        }
        if (x.chatRoomName.includes("Road")) {
          roadId = x._id;
          $(".roaddept").attr("id", `${x?._id}`);
          $(".emailList_sections").append(
            `<div class="section roadSection" id="${x?._id}">
            <span class="material-icons" style="color: brown;"> add_road </span>
            <h4>Road</h4>
          </div>`
          );
        }
        if (x.chatRoomName.includes("Water")) {
          waterId = x._id;
          $(".waterdept").attr("id", `${x?._id}`);
          $(".emailList_sections").append(
            `<div class="section waterSection" id="${x?._id}">
            <span class="material-icons" style="color: skyblue;"> water </span>
            <h4>Water</h4>
          </div>`
          );
        }
        if (x.chatRoomName.includes("Electricity")) {
          electricityId = x._id;
          $(".elecdept").attr("id", `${x?._id}`);
          $(".emailList_sections").append(
            `<div class="section electricitySection" id="${x?._id}">
            <span class="material-icons" style="color: #6400ff;"> bolt </span>
            <h4>Electricity</h4>
          </div>`
          );
        }
      });
      console.log(data);
    },
    error: function (data) {
      alert("could not get chat data Please login first!");
      window.location.replace("http://localhost:3000/api/user/login");
    },
  });
}
function getInboxMails(roomId) {
  let sessionId = getCookie("SESSIONID");
  if (sessionId) {
    // let main = $(".mainSection").attr("id");
    // console.log("id for the main is " + main);
    console.log(roomId);
    $(".emailList_list").empty();
    $.ajax({
      type: "GET",
      url: `http://localhost:3000/${roomId}/inbox`,

      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionId}`,
      },
      success: function (data) {
        inboxMails = data;
        data.forEach((x) => {
          let stylecss;
          if (x.starred === true) {
            stylecss = "color:gold;";
          } else stylecss = "color:grey;";

          $(".emailList_list").append(` <div class="emailRow" id=${x._id}>
          <div class="emailRow_options">
            <input type="checkbox" />
            <span class="material-icons starSymbol " style =  ${stylecss} > star_border </span>
            <span class="material-icons"> label_important </span>
          </div>
          <h3 class="emailRow_title">${x.sentBy.Name}</h3>
          <div class="emaiRow_message">
            <h4>${x.complaint.heading}</h4>
          </div>
          <p class="emailRow_time">${x.createdAt}</p>
        </div>`);
        });
      },
      error: function (data) {
        console.log("there was an error");
      },
    });
  }
}
let selectedDept;

$("#deptSelec").on("change", function () {
  selectedDept = $(this).find("option:selected").attr("id");
});
$("#complaintBut").click(() => {
  let heading = $("#headingId").val().trim();
  let complaint = $("#complaintId").val().trim();
  let address = $("#addressId").val().trim();
  let sessionId = getCookie("SESSIONID");
  if (heading != "" && complaint != "" && address != "") {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/sendComplaint",
      data: JSON.stringify({
        room: selectedDept,
        heading: heading,
        complaint: complaint,
        address: address,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionId}`,
      },
      success: function (message) {
        console.log(message);
        socketio.emit("new mail", message);
        $("#headingId").val("");
        $("#complaintId").val("");
        $("#addressId").val("");
      },
      error: function (data) {
        alert("Could not send message");
        $("#headingId").val(heading);
        $("#complaintId").val(complaint);
        $("#addressId").val(address);
        return;
      },
    });
  }
});

$("body").on("click", ".starSymbol", function () {
  let sessionId = getCookie("SESSIONID");
  let mailId = $(this).parent().parent().attr("id");
  console.log(mailId);
  console.log("star symbol is clickeds");
  //if ($("#inbox").hasClass("sidebarOption_active")) {
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/${mailId}/updateStarred`,

    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },
    success: function (data) {
      console.log("starred data is" + data);
      if (data.starred === false) {
        $(this).css("color", "grey");
      } else {
        $(this).css("color", "gold");
      }
    },
    error: function (data) {
      alert("updated starred error" + data.message);
    },
  });
  //} else if ($("#sentByHim").hasClass("sidebarOption_active")) {
  //}
});
$("body").on("click", "#inbox", function () {
  $(".emailList_sections").show();
  $("#inbox").addClass("sidebarOption_active");
  $("#sentByHim").removeClass("sidebarOption_active");
  $("#starredByHim").removeClass("sidebarOption_active");
  if ($(".waterSection").hasClass("section_selected")) getInboxMails(waterId);
  else if ($(".roadSection").hasClass("section_selected"))
    getInboxMails(roadId);
  else if ($(".electricitySection").hasClass("section_selected"))
    getInboxMails(electricityId);
  else getInboxMails(mainId);
});
$("body").on("click", "#sentByHim", function () {
  //sidebarOption_active
  $(".emailList_sections").hide();
  $("#inbox").removeClass("sidebarOption_active");
  $("#sentByHim").addClass("sidebarOption_active");
  $("#starredByHim").removeClass("sidebarOption_active");
  let sessionId = getCookie("SESSIONID");
  $(".emailList_list").empty();
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/sentMails`,

    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },
    success: function (data) {
      sentMails = data;
      console.log(sentMails);
      sentMails.forEach((x) => {
        if (x.starred === true) {
          stylecss = "color:gold;";
        } else stylecss = "color:grey;";

        $(".emailList_list").prepend(` <div class="emailRow" id=${x._id}>
          <div class="emailRow_options">
            <input type="checkbox" />
            <span class="material-icons starSymbol" style =  ${stylecss}> star_border </span>
            <span class="material-icons"> label_important </span>
          </div>
          <h3 class="emailRow_title">${x.sentBy.Name}</h3>
          <div class="emaiRow_message">
            <h4>${x.complaint.heading}</h4>
          </div>
          <p class="emailRow_time">${x.createdAt}</p>
        </div>`);
      });
    },
    error: function (data) {
      console.log("there was an error");
    },
  });
});
$("body").on("click", "#starredByHim", function () {
  //sidebarOption_active
  $(".emailList_sections").hide();
  $("#inbox").removeClass("sidebarOption_active");
  $("#sentByHim").removeClass("sidebarOption_active");
  $("#starredByHim").addClass("sidebarOption_active");
  let sessionId = getCookie("SESSIONID");
  $(".emailList_list").empty();
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/sentMails/starredMails`,

    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },
    success: function (data) {
      starredMails = data;
      console.log(starredMails);
      starredMails.forEach((x) => {
        if (x.starred === true) {
          stylecss = "color:gold;";
        } else stylecss = "color:grey;";
        $(".emailList_list").prepend(` <div class="emailRow" id=${x._id}>
          <div class="emailRow_options">
            <input type="checkbox" />
            <span class="material-icons starSymbol" style =  ${stylecss}> star_border </span>
            <span class="material-icons"> label_important </span>
          </div>
          <h3 class="emailRow_title">${x.sentBy.Name}</h3>
          <div class="emaiRow_message">
            <h4>${x.complaint.heading}</h4>
          </div>
          <p class="emailRow_time">${x.createdAt}</p>
        </div>`);
      });
    },
    error: function (data) {
      console.log("there was an error");
    },
  });
});
$("body").on("click", ".mainSection", function () {
  getInboxMails(mainId);
  $(".mainSection").addClass("section_selected");
  $(".electricitySection").removeClass("section_selected");
  $(".roadSection").removeClass("section_selected");
  $(".waterSection").removeClass("section_selected");
});
$("body").on("click", ".waterSection", function () {
  getInboxMails(waterId);
  $(".mainSection").removeClass("section_selected");
  $(".electricitySection").removeClass("section_selected");
  $(".roadSection").removeClass("section_selected");
  $(".waterSection").addClass("section_selected");
});
$("body").on("click", ".roadSection", function () {
  getInboxMails(roadId);
  $(".mainSection").removeClass("section_selected");
  $(".electricitySection").removeClass("section_selected");
  $(".roadSection").addClass("section_selected");
  $(".waterSection").removeClass("section_selected");
});
$("body").on("click", ".electricitySection", function () {
  getInboxMails(electricityId);
  $(".mainSection").removeClass("section_selected");
  $(".electricitySection").addClass("section_selected");
  $(".roadSection").removeClass("section_selected");
  $(".waterSection").removeClass("section_selected");
});

$("body").on("click", ".profile", function () {
  window.location.replace("http://localhost:3000/api/user/profile");
});
// // your code
