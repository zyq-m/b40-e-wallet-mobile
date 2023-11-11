import { api } from "../../services/axiosInstance";

export const logout = async (refreshToken) => {
  return await api.delete("/logout", {
    data: {
      refreshToken: refreshToken,
    },
  });
};
