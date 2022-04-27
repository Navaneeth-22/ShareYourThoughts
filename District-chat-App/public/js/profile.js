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
//sessionId=cbkjsbckjdv;ghjg=sknlkffj;djbd=dl fkjf kj; == [ sessionId=cbkjsbckjdv,]
//sessionId=cbkjsbckjdv=>c
//sessionid= ->name
//c.substring(8,20)
//div id="content"
{
  /* <div  id="gh ">
  <div id="hgh"> 

  </div>
</div>
$("#hgh").append(`<p>${}`) */
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
      $("#nameId").empty();

      $("#nameId").append(userInf.Name);
      $("#emailID").empty();

      $("#emailID").append(userInf.email);
      $("#aadharID").empty();

      $("#aadharID").append(userInf.aadharNo);

      $("#stateID").empty();

      $("#stateID").append(userInf.state);
    },
    error: function (data) {
      alert("Not able to get user details" + data.message);
    },
  });
});

$(".profile-button").click(() => {
  window.location.replace("http://localhost:3000/Home");
});
