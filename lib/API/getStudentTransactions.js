import instanceAxios from "../instanceAxios";

export const getStudentTransactions = (id, signal) => {
  return instanceAxios
    .get(`/api/transactions/students/${id}`, { signal: signal })
    .then(res => res.data);
};
