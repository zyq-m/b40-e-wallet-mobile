import { createContext } from "react";

export const UserContext = createContext({
  id: undefined,
  login: false,
  student: false,
  cafe: false,
});
