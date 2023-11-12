import { api } from "../../services/axiosInstance";

export const getProfile = async (id, signal) => {
  return await api.get(`/cafe/profile/${id}`, { signal: signal });
};

export const updateProfile = async (id, profile) => {
  return await api.put(`/cafe/profile/${id}`, {
    bankName: profile.bank,
    accountNo: profile.accountNo,
  });
};
