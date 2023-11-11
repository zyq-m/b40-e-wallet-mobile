import { api } from "../../services/axiosInstance";

export const getTotalSpent = async (id, signal) => {
  return api
    .get(`/api/transactions/students/today/${id}`, { signal: signal })
    .then((res) => res.data);
};
