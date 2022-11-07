import instanceAxios from "../instanceAxios";

export const logout = async refreshToken => {
  return await instanceAxios.delete("/logout", {
    data: {
      refreshToken: refreshToken,
    },
  });
};
