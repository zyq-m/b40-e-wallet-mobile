import { io } from "socket.io-client";
import { REACT_APP_API_KEY_LOCAL, REACT_APP_API_KEY } from "@env";
export const ws = io(
  "https://ekupon.herokuapp.com/"
  // || REACT_APP_API_KEY_LOCAL || REACT_APP_API_KEY
);
