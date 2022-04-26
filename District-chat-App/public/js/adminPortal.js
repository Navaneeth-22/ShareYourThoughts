let userLoggedIn;

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
  getAllusers();
});
function getAllusers() {
  let sessionId = getCookie("SESSIONID");
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/getAllUsers",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $("body").append(`<div class="container"></div>
        <div class="content">
            <div class="user-details">
              <div class="input-box">
                <span class="details" id="name">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  id="nameId${i}"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details" id="username">Username</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  id="usernameId${i}"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details" id="eamil">Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="emailId${i}"
                  required
                />
              </div>
             
              
              <div class="input-box">
                <span class="details" id="aadhar">Aadhar</span>
                <input
                  type="number"
                  placeholder="Enter aadhar"
                  id="aadharId${i}"
                  required
                />
              </div>
    
             
    
           
    
              <div class="input-box">
                <span class="details" id="district">District</span>
                <input
                  type="text"
                  placeholder="Enter District"
                  id="districtId${i}"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details" id="state">State</span>
                <input
                  type="text"
                  placeholder="Enter state"
                  id="stateId${i}"
                  required
                />
              </div>
              <div class="input-box">
                <span class="details" id="occupation">Occupation</span>
                <input
                  type="text"
                  placeholder="Enter accupation"
                  id="occupationId${i}"
                  required
                />
              </div>
            </div>
    
            <button id="${data[i]._id}">Update</button>
            <button id="${data[i]._id}">Delete</button>
          </div>`);
      }
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        $(`#nameId${i}`).val(data[i].Name);
        $(`#usernameId${i}`).val(data[i].userName);
        $(`#emailId${i}`).val(data[i].email);
        $(`#aadharId${i}`).val(data[i].aadharNo);
        $(`#occupationId${i}`).val(data[i].occupation);
        $(`#districtId${i}`).val(data[i].district);
        $(`#stateId${i}`).val(data[i].state);
        $(`#update${i}`).addClass("update");
        $(`#delete${i}`).addClass("delete");
      }
    },
    error: function (data) {
      alert("Login Failed" + data.message);
    },
  });
}

$("body").on("click", ".update", function () {
  let id = $(this).attr("id");
  $.ajax({
    type: "PUT",
    url: "http://localhost:3000/updateUser",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },
    success: function (data) {},
    error: function (data) {},
  });
});
