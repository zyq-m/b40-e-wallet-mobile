import instanceAxios from "../instanceAxios";

export const setTransactions = async ({ id, data }) => {
  try {
    const response = await instanceAxios.post(
      `/api/transactions/cafe/${id}`,
      data
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
