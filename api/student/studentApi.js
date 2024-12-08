import { api } from "../../services/axiosInstance";

export const pay = async (fundId, amount, icNo, cafeId) => {
	return await api.post("/transaction/pay", {
		fundId,
		amount,
		icNo,
		cafeId,
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
