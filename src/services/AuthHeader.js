const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { Authorization: "Bearer-" + user.accessToken };
  } else {
    return {};
  }
};

const getRefreshTokenHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.refreshToken) {
    return { Authorization: "Bearer-" + user.refreshToken };
  } else {
    return {};
  }
};

const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.refreshToken) {
    return user.refreshToken;
  } else {
    return "";
  }
};

const AuthHeader = {
  getAuthHeader,
  getRefreshTokenHeader,
  getRefreshToken,
};

export default AuthHeader;
