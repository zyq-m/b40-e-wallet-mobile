import instanceAxios from "../instanceAxios";
import { save } from "../../utils/SecureStore";
import { popupMessage } from "../../utils/popupMessage";

export const login = async (user, data, errorMessage) => {
  try {
    const response = await instanceAxios.post(`/${user}/login`, data);

    save("accessToken", response.data.accessToken);
    save("refreshToken", response.data.refreshToken);
    save("login", true);

    if (user === "students") {
      save("id", data.matric_no);
      save("student", true);
    } else {
      save("id", data.username);
    }

    return;
  } catch (error) {
    popupMessage({
      title: "Cannot login",
      message: errorMessage,
    });
  }
};
