import { useState, useEffect } from "react";
import moment from "moment";

import { api } from "../services/axiosInstance";
import { useUserContext } from "./useUserContext";
import { useTriggerRefresh } from "./useTriggerRefresh";

export const useTransaction = (params) => {
	const { user } = useUserContext();
	const { trigger } = useTriggerRefresh(user.transaction?.refresh);
	const [transactions, setTransactions] = useState({ data: [] });
	const [list, setList] = useState([
		{
			id: 0,
			label: "All",
			checked: false,
			api: async (signal) => await api.get(getApiUrl().all, { signal }),
		},
		{
			id: 1,
			label: "Today",
			checked: true,
			api: async (signal) => await api.get(getApiUrl().today, { signal }),
		},
		{
			id: 2,
			label: "Week",
			checked: false,
			api: async (signal) => await api.get(getApiUrl().week, { signal }),
		},
		{
			id: 3,
			label: "Month",
			checked: false,
			api: async (signal) => await api.get(getApiUrl().month, { signal }),
		},
	]);

	const onList = (id) => {
		return setList((prev) =>
			prev.map((data) => {
				if (data.id === id) {
					data.api()
						.then((res) => {
							setTransactions(res.data);
						})
						.catch(() => {
							setTransactions({ data: [] });
						});
					return { ...data, checked: true };
				} else {
					return { ...data, checked: false };
				}
			})
		);
	};

	const initLoad = async (signal) => {
		const res = await api.get(`/transaction/${user.role}/${user.id}`, {
			signal,
		});

		setTransactions(res.data);
	};

	const getApiUrl = () => {};

	function resetList() {
		setList((prev) => prev.map((val) => ({ ...val, checked: false })));
	}

	useEffect(() => {
		const controller = new AbortController();
		initLoad(controller.signal);

		return () => {
			controller.abort();
		};
	}, [trigger]);

	return { transactions, list, onList, setTransactions, resetList };
};
