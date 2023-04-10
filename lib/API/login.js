import instanceAxios from "../instanceAxios";
import { save } from "../../utils/SecureStore";

export const login = async (user, data) => {
  const response = await instanceAxios.post(`/${user}/login`, data);

  try {
    if (user === "students") {
      save("id", data.matric_no);
      save("student", true);
    } else {
      save("id", data.username);
    }

    save("accessToken", response.data.accessToken);
    save("refreshToken", response.data.refreshToken);
    save("login", true);
  } catch (error) {}
};
