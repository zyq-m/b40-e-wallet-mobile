import instanceAxios from "../instanceAxios";

export const setTransactions = async ({ id, data }) => {
  const response = await instanceAxios.post(
    `/api/transactions/cafe/${id}`,
    data
  );

  return response.data;
};
