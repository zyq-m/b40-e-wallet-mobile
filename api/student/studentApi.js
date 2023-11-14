import { api } from "../../services/axiosInstance";

export const pay = async (userId, cafeId, amount) => {
  return await api.post("/student/pay", {
    matricNo: userId,
    cafeId: cafeId,
    amount: amount,
  });
};
