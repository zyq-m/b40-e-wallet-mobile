import { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { Refresh, TransactionList } from "../components";
import { useUserContext } from "../hooks";

import { globals, transactionStyle } from "../styles";
import { api } from "../services/axiosInstance";

const Transaction = ({ navigation, route }) => {
	const { user } = useUserContext();
	const [tf, setTf] = useState([]);

	useEffect(() => {
		const controller = new AbortController();

		api.get(`/transaction/${user.role}/${user.id}`, {
			signal: controller.signal,
		}).then((res) => {
			setTf(res.data);
		});

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<View style={[globals.container, {}]}>
			<Refresh transaction={true} style={{ paddingBottom: 24 }}>
				<TransactionList
					data={tf}
					navigation={navigation}
					user={user}
					border={true}
					params={route.params}
					style={transactionStyle.transactionItemWrap}
				/>
			</Refresh>
			{!tf.length ? (
				<Text
					style={{
						flex: 1,
						textAlign: "center",
						fontWeight: "500",
						color: "rgba(132, 132, 132, 1)",
					}}
				>
					No transactions history
				</Text>
			) : (
				<></>
			)}
		</View>
	);
};

export default Transaction;
