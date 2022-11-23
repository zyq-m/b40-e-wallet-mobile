import instanceAxios from "../instanceAxios";

export const changeStudentPass = async (matricNo, data) => {
  const res = instanceAxios.put(`/api/password/students/${matricNo}`, data);
  return (await res).data;
};

export const changeCafePass = async (username, data) => {
  const res = instanceAxios.put(`/api/password/cafe/${username}`, data);
  return (await res).data;
};
