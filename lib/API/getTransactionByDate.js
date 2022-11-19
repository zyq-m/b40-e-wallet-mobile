export const getTransactionsByDate = async (id, from, to) => {
  const res = await instance.get(
    `/api/transactions/cafe/range/${id}/${from}/${to}`
  );

  return await res.data;
};
