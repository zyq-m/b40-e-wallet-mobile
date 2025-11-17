import { useEffect } from "react";
import { remove, removeAll } from "../utils/asyncStorage";
import { socket } from "../services/socket";
import { useUserContext } from "../hooks";

const InactivityHandler = ({ timeout = 900000 }) => {
	// 15 minutes
	const { user, setUser } = useUserContext();

	useEffect(() => {
		let timer;

		const resetTimer = () => {
			clearTimeout(timer);
			timer = setTimeout(async () => {
				// Clear tokens or session here
				if (user) {
					socket.emit("user:disconnect", { id: user?.id });
					await remove("token");
					await remove("userDetails");
					setUser({});
				}
			}, timeout);
		};

		// Events to listen for user activity
		window.addEventListener("mousemove", resetTimer);
		window.addEventListener("keypress", resetTimer);
		window.addEventListener("click", resetTimer);

		resetTimer(); // Start timer on mount

		return () => {
			clearTimeout(timer);
			window.removeEventListener("mousemove", resetTimer);
			window.removeEventListener("keypress", resetTimer);
			window.removeEventListener("click", resetTimer);
		};
	}, [timeout]);

	return null; // This component only manages inactivity
};

export default InactivityHandler;
