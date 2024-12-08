import { api } from "../../services/axiosInstance";
import { storeObject, getObject } from "../../utils/asyncStorage";

// login
export const login = async (id, password) => {
	const token = await api.post("/auth/login", {
		id: id,
		password: password,
	});

	// Store token in async storage
	await storeObject("token", token.data);
	// return role
	return token.data;
};

// Logout
export const logout = async () => {
	const token = await getObject("token");
	return await api.post("/auth/logout", {
		refreshToken: token.refreshToken,
	});
};

export const changePassword = async (id, oldPass, newPass, rePass) => {
	return await api.put("/auth/change/password", {
		id,
		oldPass,
		newPass,
		rePass,
	});
};
