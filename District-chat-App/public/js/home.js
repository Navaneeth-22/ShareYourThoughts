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
  $(".mainPage").hide();
  setTimeout(removeLoader, 5000);
  let sessionId = getCookie("SESSIONID");
  console.log(sessionId);
  if (!sessionId) {
    $(".navBar").append(
      '<a href="http://localhost:3000/api/user/login">Login</a>'
    );
    $(".navBar").append(
      '<a href="http://localhost:3000/api/user/signup">signup</a>'
    );
  } else {
    $(".navBar").append(
      '<a href="http://localhost:3000/api/user/profile">Profile</a>'
    );
  }

  
});
function removeLoader() {
  $("#loadingDiv").fadeOut(500, function () {
    // fadeOut complete. Remove the loading div
    $("#loadingDiv").remove(); //makes page more lightweight
    $(".mainPage").show();
  });
}
