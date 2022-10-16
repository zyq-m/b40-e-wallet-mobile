import instanceAxios from "../instanceAxios";
import { save } from "../../utils/SecureStore";

export const loginStudent = async data => {
  try {
    const response = await instanceAxios.post("/students/login", data);

    save("accessToken", response.data.accessToken);
    save("refreshToken", response.data.refreshToken);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
