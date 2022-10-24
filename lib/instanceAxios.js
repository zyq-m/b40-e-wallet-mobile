import axios from "axios";
import { getValueFor, save } from "../utils/SecureStore";

const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
});

// refresh token implementation
const getRefreshToken = async () => {
  try {
    const token = await getValueFor("refreshToken");
    const newToken = await instanceAxios.post("/token", {
      refreshToken: token,
    });

    save("accessToken", newToken.data.accessToken);
  } catch (error) {
    console.log(error);
  }
};

instanceAxios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response.status == 403) {
      await getRefreshToken();

      // return prev request
      return instanceAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.request.use(
  async config => {
    const token = await getValueFor("accessToken");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default instanceAxios;
