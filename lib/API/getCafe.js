import instanceAxios from "../instanceAxios";

export const getCafe = async signal => {
  const response = await instanceAxios.get("/api/cafe", { signal: signal });
  return response.data;
};
