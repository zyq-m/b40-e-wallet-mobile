import { api } from "../../services/axiosInstance";

export const getCafe = async (signal) => {
  const response = await api.get("/api/cafe", { signal: signal });
  return response.data;
};
