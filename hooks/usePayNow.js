import { useState, useEffect } from "react";
import { api } from "../services/axiosInstance";
import { useUserContext } from "./useUserContext";
import { Platform } from "react-native";

export const usePayNow = ({ loyalty }) => {
	const [page, setPage] = useState({});
	const { user } = useUserContext();

	const point = [
		{
			active: true,
			screen: user.role === "CAFE" ? "Cashless" : "Cafe List",
		},
		{
			active: false,
			screen: user.role === "CAFE" ? "Green Campus" : "Cafe List",
		},
	];

	const onActive = (value) => {
		setPage((prev) => {
			const title = prev.title;
			const option = prev.option.map((e) => {
				let returnVal = { ...e };

				if (e.id === value) {
					returnVal.active = true;
				} else {
					returnVal.active = false;
				}

				return returnVal;
			});

			return { title, option };
		});
	};

	useEffect(() => {
		if (!loyalty) {
			setPage({
				title: "Choose an amount",
				option: [
					{
						id: 1,
						name: "RM 1",
						value: 1,
						active: true,
						role: ["CAFE"],
					},
					{
						id: 2,
						name: "RM 2",
						value: 2,
						active: false,
						role: ["CAFE"],
					},
					{
						id: 3,
						name: "Enter amount",
						value: 0,
						active: false,
						role: ["CAFE"],
					},
				],
			});
		} else {
			api.get("/point")
				.then((res) => {
					const option = res.data.map((data, i) => {
						return {
							...data,
							active: point[i].active,
							screen: point[i].screen,
							role: [
								"B40",
								"MAIDAM",
								"PAYNET",
								"TILAWAH",
								"FASI_MMS_2025",
							],
						};
					});

					setPage({
						title: "Choose a campaign",
						option: option,
					});
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, []);

	return { page, onActive, setPage };
};
