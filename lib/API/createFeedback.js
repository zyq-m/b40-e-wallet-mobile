import instanceAxios from "../instanceAxios";

export const createFeedback = async (id, title, desc) => {
  await instanceAxios.post("/api/feedback", {
    id: id,
    title: title,
    description: desc,
  });
};
