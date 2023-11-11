import { api } from "../../services/axiosInstance";

export const getStudentTransactions = (id, signal) => {
  return api
    .get(`/api/transactions/students/${id}`, { signal: signal })
    .then((res) => res.data);
};
