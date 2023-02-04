import instanceAxios from "../instanceAxios";

export const getProfile = async (id, signal) => {
  return await instanceAxios.get(`/api/cafe/profile/${id}`, { signal: signal });
};

export const updateProfile = async (id, bankName, accountNo) => {
  return await instanceAxios.put(`/api/cafe/profile/${id}`, {
    bankName: bankName,
    accountNo: accountNo,
  });
};
