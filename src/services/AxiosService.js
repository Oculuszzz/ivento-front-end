import axios from "axios";
import AuthHeader from "./AuthHeader";

class AxiosService {
  constructor(url) {
    const options = {
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 6000,
    };
    this.service = axios.create(options);

    this.service.interceptors.request.use(
      (request) => requestHandler(request),
      (error) => errorHandler(error)
    );

    this.service.interceptors.response.use(
      (response) => responseHandler(response),
      (error) => errorHandler(error)
    );
  }
}

export const axiosInstance = new AxiosService(
  process.env.REACT_APP_BACKEND_BASE_URL
);

export const userAxiosInstance = new AxiosService(
  process.env.REACT_APP_BACKEND_BASE_URL + "users"
);

export const productAxiosInstance = new AxiosService(
  process.env.REACT_APP_BACKEND_BASE_URL + "products"
);

export const customerOrderAxiosInstance = new AxiosService(
  process.env.REACT_APP_BACKEND_BASE_URL + "customer-orders"
);

const requestHandler = (request) => {
  return request; // We can do something before send request
};

const responseHandler = (response) => {
  return response; // We can do something before initialize the response
};

const errorHandler = (error) => {
  // Access Token Required/Expired
  if (error.response.status === 401) {
    refreshToken();
  }

  return Promise.reject(error);
};

const refreshToken = () => {
  // Attempt to refresh token
  axios
    .post(process.env.REACT_APP_BACKEND_BASE_URL + "refreshToken", {
      refreshToken: AuthHeader.getRefreshToken(),
    })
    .then((response) => {
      // update state of data
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      window.location.reload();
    })
    .catch((err) => {
      console.log("refresh token expired :", err.response);
      localStorage.removeItem("user");
      window.location.reload();
    });
};

export default AxiosService;
