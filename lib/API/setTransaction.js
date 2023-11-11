import { api } from "../../services/axiosInstance";

export const setTransactions = async ({ id, data }) => {
  const response = await api.post(`/api/transactions/cafe/${id}`, data);

  return response.data;
};
