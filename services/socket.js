import { io } from "socket.io-client";
import { apiUrl } from "../utils/environment";
import { getObject } from "../utils/asyncStorage";

const getToken = async () => {
  const token = await getObject("token");

  return token?.accessToken;
};

export const socket = io(apiUrl, {
  auth: {
    token: 0,
  },
}); // store in env

socket.on("connect_error", async (err) => {
  if (err.message === "authentication error") {
    socket.auth.token = await getToken();
  }
  // socket.connect();
});
