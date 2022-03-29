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
$(document).ready(function () {
  $("#submitBut").click(() => {
    console.log("hello");
    const Name = $("#nameId").val();
    /*  Name,
    userName,
    email,
    aadharNo,
    dateOfBirth,
    occupation,
    photo,
    district,
    state,
    password,*/
    const userName = $("#usernameId").val();
    const email = $("#emailId").val();
    const aadharNo = $("#aadharId").val();
    const occupation = $("#occupationId").val();
    const photo = $("#photoId").val();
    const district = $("#districtId").val();
    const state = $("#stateId").val();
    const password = $("#passwordId").val();
    console.log("jkjkg" + aadharNo + password);
    if (!aadharNo || !password) {
      alert("aadhar and password required");
      return;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/user/signup",
      data: JSON.stringify({
        Name: Name,
        userName: userName,
        email: email,
        aadharNo: aadharNo,
        occupation: occupation,
        photo: photo,
        district: district,
        state: state,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (data) {
        //localStorage.token = data.token;
        window.location.replace("/Home");
        //lert("successs" + data.message);
      },
      error: function (data) {
        alert("Login Failed" + data.message);
      },
    });
  });
});
/*
const addUser = async () => {
  const Name = document.getElementById("NameId").value;
  const userName = document.getElementById("userNameId").value;
  const email = document.getElementById("emailId").value;
  const aadharNo = document.getElementById("aadharNoId").value;
  const occupation = document.getElementById("occupationId").value;
  const photo = document.getElementById("photoId").value;
  const district = document.getElementById("districtId").value;
  const state = document.getElementById("stateId").value;
  const password = document.getElementById("passwordId").value;

  try {
    const configr = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/user/signup",
      {
        Name,
        userName,
        email,
        aadharNo,
        dateOfBirth,
        occupation,
        photo,
        district,
        state,
        password,
      },
      configr
    );

    localStorage.setItem("user-info", JSON.stringify(data));
  } catch (error) {}
};
*/
