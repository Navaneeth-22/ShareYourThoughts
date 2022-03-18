const { default: axios } = require("axios");

const loginUser = async () => {
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
