import instanceAxios from "../instanceAxios";

export const getTotalSpent = async (id, signal) => {
  return instanceAxios
    .get(`/api/transactions/students/today/${id}`, { signal: signal })
    .then(res => res.data);
};
