import { api } from "../../services/axiosInstance";

export const pay = async (userId, cafeId, amount) => {
  return await api.post("/student/pay", {
    matricNo: userId,
    cafeId: cafeId,
    amount: amount,
  });
};

export const collectPoint = async (userId, cafeId, amount, pointId, otp) => {
  return await api.post("/student/point/collect", {
    matricNo: userId,
    cafeId: cafeId,
    amount: amount,
    pointId: pointId,
    otp: otp,
  });
};
