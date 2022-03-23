$(document).ready(function () {
  $("#submitBut").click(() => {
    console.log("hello");
    const aadharNo = $("#aadharId").val();
    const password = $("#passwordId").val();
    console.log("jkjkg" + aadharNo + password);
    if (!aadharNo || !password) {
      alert("aadhar and password required");
      return;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/user/login",
      data: JSON.stringify({
        aadharNo: aadharNo,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (data) {
        //localStorage.token = data.token;

        window.location.replace("/Home");
      },
      error: function (data) {
        alert("Login Failed" + data.message);
      },
    });
  });
});

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
const home = async () => {
  let sessionId = getCookie("SESSIONID");
  console.log(sessionId);
  const element = document.getElementById("parag");

  element.innerText = JSON.stringify(sessionId);
  console.log("klk" + JSON.stringify(sessionId));
  const config2 = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },
  };

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
    },
    error: function (data) {
      alert("there was an error in adding user");
    },
  });
};
