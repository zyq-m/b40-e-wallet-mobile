import React from "react";
import { ws } from "../lib/Socket";
import { logout } from "../lib/API";
import { deleteItem, getValueFor } from "../utils/SecureStore";
import { useUserContext } from "./useUserContext";

export function useLogout() {
  const { user, setUser } = useUserContext();

  const onLogout = async () => {
    const refreshToken = await getValueFor("refreshToken");
    ws.emit("logout", user.id);

    const runLogout = logout(refreshToken);
    const delAccessToken = deleteItem("accessToken");
    const delRefreshToken = deleteItem("refreshToken");
    const id = deleteItem("id");
    const login = deleteItem("login");
    const student = deleteItem("student");

    Promise.all([
      runLogout,
      delAccessToken,
      delRefreshToken,
      id,
      login,
      student,
    ]).then(() => {
      setUser(prev => ({
        ...prev,
        id: undefined,
        login: false,
        student: false,
      }));
    });
  };
  return { onLogout };
}
