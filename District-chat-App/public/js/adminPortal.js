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
        $("body").append(`<center>
        <div class="content">
            <div class="user-details">
              <div class="input-box">
                <p class="details" id="name">Full Name</p>
                <input
                  type="text"
                  placeholder="Enter your name"
                  id="nameId${i}"
                  required
                />
              </div>
              <div class="input-box">
                <p class="details" id="username">Username</p>
                <input
                  type="text"
                  placeholder="Enter your username"
                  id="usernameId${i}"
                  required
                />
              </div>
              <div class="input-box">
                <p class="details" id="eamil">Email</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="emailId${i}"
                  required
                />
              </div>
             
              
              <div class="input-box">
                <p class="details" id="aadhar">Aadhar</p>
                <input
                  type="number"
                  placeholder="Enter aadhar"
                  id="aadharId${i}"
                  required
                />
              </div>
    
             
    
           
    
              <div class="input-box">
                <p class="details" id="district">District</p>
                <input
                  type="text"
                  placeholder="Enter District"
                  id="districtId${i}"
                  required
                />
              </div>
              <div class="input-box">
                <p class="details" id="state">State</p>
                <input
                  type="text"
                  placeholder="Enter state"
                  id="stateId${i}"
                  required
                />
              </div>
              <div class="input-box">
                <p class="details" id="occupation">Occupation</p>
                <input
                  type="text"
                  placeholder="Enter accupation"
                  id="occupationId${i}"
                  required
                />
              </div>
            </div>
    
           
          </div></center>`);
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
      }
    },
    error: function (data) {
      alert("Login Failed" + data.message);
    },
  });
}
