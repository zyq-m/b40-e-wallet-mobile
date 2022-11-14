import { io } from "socket.io-client";
export const ws = io(process.env.REACT_APP_API_KEY_LOCAL);

console.log(process.env.REACT_APP_API_KEY_LOCAL);
