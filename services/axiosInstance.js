import axios from "axios";
import { renewToken } from "../api/auth/auth";
import { getObject, storeObject } from "../utils/asyncStorage";
import { apiUrl } from "../utils/environment";

export const api = axios.create({
  baseURL: apiUrl,
});

// Axios interceptor handle access token authentication
api.interceptors.request.use(
  async function (config) {
    const token = await getObject("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Handle refreshToken
// Resource: https://www.thedutchlab.com/insights/using-axios-interceptors-for-refreshing-your-api-token
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await renewToken();
      // Store access token
      const oldToken = await getObject("token");
      oldToken.accessToken = newToken.data.accessToken;
      await storeObject("token", oldToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newToken.data.accessToken}`;

      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
