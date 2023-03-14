import axios from "axios";

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

export default AxiosService;
