let userInf;
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
  let session = getCookie("SESSIONID");

  $.ajax({
    type: "GET",
    url: "http://localhost:3000/getUserInfo",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session}`,
    },
    success: function (data) {
      userInf = data;
      console.log(data);
      console.log(userInf);
      $("#content").append(
        `<p>Name:${userInf?.Name}</p><p>AadharNo:${userInf?.aadharNo}</p><p>Name:${userInf?.district}</p><p>Name:${userInf.state}</p>`
      );
    },
    error: function (data) {
      alert("Not able to get user details" + data.message);
    },
  });
});

$("#getHome").click(() => {
  window.location.replace("http://localhost:3000/Home");
});
