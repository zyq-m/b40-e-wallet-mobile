import { api } from "../../services/axiosInstance";

export const createFeedback = async (id, title, desc) => {
  await api.post("/api/feedback", {
    id: id,
    title: title,
    description: desc,
  });
};
