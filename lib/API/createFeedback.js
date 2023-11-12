import { api } from "../../services/axiosInstance";

export const createFeedback = async (id, report) => {
  await api.post("/feedback", {
    id: id,
    description: `${report.title}: ${report.desc}`,
  });
};
