import { api } from "../../services/axiosInstance";

export const changeStudentPass = async (matricNo, data) => {
  const res = api.put(`/api/password/students/${matricNo}`, data);
  return (await res).data;
};

export const changeCafePass = async (username, data) => {
  const res = api.put(`/api/password/cafe/${username}`, data);
  return (await res).data;
};
