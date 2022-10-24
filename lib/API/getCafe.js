import instanceAxios from "../instanceAxios";

export const getCafe = async signal => {
  try {
    const response = await instanceAxios.get("/api/cafe", { signal: signal });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
