import { api } from "../../services/axiosInstance";

export const getProfile = async (id, signal) => {
  return await api.get(`/api/cafe/profile/${id}`, { signal: signal });
};

export const updateProfile = async (id, bankName, accountNo) => {
  return await api.put(`/api/cafe/profile/${id}`, {
    bankName: bankName,
    accountNo: accountNo,
  });
};
