import axiosClient, { AxiosInstance } from "axios";
import { AuthenManager } from "./index";

const instance: AxiosInstance = axiosClient.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
  baseURL: process.env.REACT_APP_BASE_URL,
});

const refreshToken = () =>
  instance.post("/token", {
    // refreshToken: getLocalRefreshToken()
  });

instance.interceptors.request.use((config) => {
  config.headers = {
    Authorization: AuthenManager.shared().getToken(),
  };
  return config;
});

instance.interceptors.response.use(
  (res) => {
    const { code, auto } = res.data;
    if (code === 401) {
      if (auto === "yes") {
        return refreshToken().then((rs) => {
          const { token } = rs.data;
          AuthenManager.shared().setToken(token);
          const { config } = res;
          config.headers = {
            Authorization: token,
          };
          config.baseURL = "http://localhost:3000/";
          return instance(config);
        });
      }
    }
    return res;
  },
  (err) => {
    if (err.response) {
      return Promise.reject(err.response);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);

export default instance;
