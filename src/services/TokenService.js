const isUserExisted = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return true;
  } else {
    return false;
  }
};

const getUsername = () => {
  return JSON.parse(localStorage.getItem("user")).username;
};

const getUserEmail = () => {
  return JSON.parse(localStorage.getItem("user")).email;
};

const getUserRole = () => {
  const user = localStorage.getItem("user");

  if (user) {
    return JSON.parse(localStorage.getItem("user")).role;
  } else {
    return "";
  }
};

const getUserImage = () => {
  return "";
};

const getUserData = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const TokenService = {
  isUserExisted,
  getUsername,
  getUserEmail,
  getUserImage,
  getUserRole,
  getUserData,
};

export default TokenService;
