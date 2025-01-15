import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { api } from "../services/axiosInstance";

import { useUserContext } from "./useUserContext";
import { useTriggerRefresh } from "./useTriggerRefresh";
import { usePushNotification } from "./usePushNotification";

export const useDashboard = () => {
	const [dashboard, setDashboard] = useState();
	const { schedulePushNotification } = usePushNotification();
	const { user } = useUserContext();
	const { trigger } = useTriggerRefresh(user.dashboard?.refresh);

	const defineRole = async () => {
		if (user.role === "STUDENT") {
			api.get(`/student/${user?.id}`)
				.then((res) => {
					setDashboard((prev) => ({
						...prev,
						id: res.data.matric_no,
						name: res.data.name,
					}));
				})
				.catch((err) => {
					console.error(err);
				});
			socket.emit("student:get-wallet-total", { icNo: user?.id });
			socket.on("student:get-wallet-total", (res) => {
				setDashboard((prev) => ({
					...prev,
					transaction: res.transaction,
					coupons: res.coupon,
				}));
			});
		}

		if (user.role === "CAFE") {
			api.get(`/cafe/${user?.id}`)
				.then((res) => {
					setDashboard((prev) => ({
						...prev,
						id: res.data.id,
						name: res.data.cafe_name,
					}));
				})
				.catch((e) => {
					console.log(e);
				});
			socket.emit("cafe:get-sales-total", {
				cafeId: user?.id,
			});
			socket.on("cafe:get-sales-total", (res) => {
				setDashboard((prev) => ({
					...prev,
					total: res.total,
					transaction: res.transaction,
				}));
			});
		}
	};

	useEffect(() => {
		socket.emit("user:connect", { id: user.id });
		defineRole();
	}, [socket, trigger]);

	useEffect(() => {
		socket.on("notification:receiver", async (msg) => {
			await schedulePushNotification(msg);
		});

		return () => {
			socket.removeAllListeners();
		};
	}, []);

	return { dashboard };
};
