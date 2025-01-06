import { useState, useEffect } from "react";
import { Text, View, Platform } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { Refresh, FilterList, TransactionList } from "../components";
import { useUserContext } from "../hooks";

import { globals, transactionStyle } from "../styles";
import { api } from "../services/axiosInstance";
import dayjs from "dayjs";
import toMYR from "../utils/toMYR";

const Transaction = ({ navigation, route }) => {
	const { user } = useUserContext();
	const [collapse, setCollapse] = useState(false);
	const [tf, setTf] = useState({});
	const [filter, setFilter] = useState({
		from: dayjs().format("YYYY-MM-DD"),
		to: dayjs().format("YYYY-MM-DD"),
	});

	useEffect(() => {
		const controller = new AbortController();

		api.get(`/transaction/${user.role}/${user.id}`, {
			signal: controller.signal,
			params: filter,
		}).then((res) => {
			setTf(res.data);
		});

		return () => {
			controller.abort();
		};
	}, [filter]);

	useEffect(() => {
		let subscribe = true;
		const header = async () => {
			if (subscribe) {
				navigation.setOptions({
					headerRight: () => (
						<View style={transactionStyle.row}>
							<MaterialIcon
								name="filter-list"
								size={25}
								onPress={() => setCollapse(!collapse)}
								style={
									Platform.OS === "web" && { marginRight: 11 }
								}
							/>
						</View>
					),
				});
			}
		};

		header();

		return () => {
			subscribe = false;
		};
	}, []);

	return (
		<View style={[globals.container, {}]}>
			<Refresh transaction={true} style={{ paddingBottom: 24 }}>
				<TransactionList
					data={tf?.transactions}
					navigation={navigation}
					user={user}
					border={true}
					params={route.params}
					style={transactionStyle.transactionItemWrap}
				/>
			</Refresh>
			{!tf?.transactions?.length ? (
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
				<View
					style={{
						paddingHorizontal: 16,
						paddingTop: 16,
						paddingBottom: 12,
						borderTopLeftRadius: 9,
						borderTopRightRadius: 9,
						borderWidth: 1,
						borderColor: "rgba(0, 0, 0, 0.08)",
						backgroundColor: "#FFF",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "baseline",
							gap: 4,
						}}
					>
						<Text
							style={{
								fontSize: 12,
								fontWeight: "500",
								color: "rgba(0, 0, 0, 0.47)",
							}}
						>
							Total:
						</Text>
						<Text style={{ fontWeight: "500" }}>
							{toMYR(tf?.summary.totalAmount ?? 0)}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "baseline",
							gap: 4,
						}}
					>
						<Text
							style={{
								fontSize: 12,
								fontWeight: "500",
								color: "rgba(0, 0, 0, 0.47)",
							}}
						>
							Transaction:
						</Text>
						<Text style={{ fontWeight: "500" }}>
							{tf?.summary.totalTf}
						</Text>
					</View>
				</View>
			)}
			{collapse && (
				<FilterList
					onCollapse={() => setCollapse(!collapse)}
					sendFilter={(e) => setFilter(e)}
				/>
			)}
		</View>
	);
};

export default Transaction;
