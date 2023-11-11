import { api } from "../../services/axiosInstance";
import { save } from "../../utils/SecureStore";

export const login = async (user, data) => {
  const response = await api.post(`/${user}/login`, data);

  save("accessToken", response.data.accessToken);
  save("refreshToken", response.data.refreshToken);
  save("login", true);

  if (user === "students") {
    save("id", data.matric_no);
    save("student", true);
  } else {
    save("id", data.username);
  }
};
