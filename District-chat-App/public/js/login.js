//const axios = require("axios";

const loginUser = async () => {
  console.log("hello");
  const aadharNo = document.getElementById("aadharNoId").value;
  const password = document.getElementById("passwordId").value;
  console.log("jkjkg" + aadharNo + password);

  if (!aadharNo || !password) {
    return new Error("hgkkg");
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ aadharNo: aadharNo, password: password }),
  };
  fetch("http://localhost:3000/api/user/login", requestOptions)
    .then((response) => response.json())
    .then((data) => localStorage.setItem("user-info", JSON.stringify(data)))
    .catch((error) => {
      console.log(error);
    });

  // if (userdata) console.log(userdata);
  //jquery
  /*const district = data.district;

  const config2 = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${data.jwtToken}`,
    },
    body: JSON.stringify({ data }),
  };
  a;

  fetch("http://localhost:5005/addUser", config2)
    .then((response) => response.json())
    .then((data) => localStorage.setItem("chat-data", JSON.stringify(data)));
    */
  /* let t = 0;

  while (t != 100000000) {
    t++;
  }*/
};

const caller = async () => {
  await loginUser();
};

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
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${sessionId}`,
    },
  };

  fetch("http://localhost:3000/Home", config2);
};
