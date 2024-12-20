import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { globals } from "../../styles";
import toMYR from "../../utils/toMYR";
import dayjs from "dayjs";

const CouponDetail = ({ route }) => {
	const { data } = route.params;

	return (
		<View
			style={[
				globals.container,
				{ paddingHorizontal: 16, paddingTop: 16 },
			]}
		>
			<List title={"Coupon Name"} child={data.fund.name} />
			<List title={"My Balance"} child={toMYR(data.balance)} />
			<List
				title={"Limit Spend Per Day"}
				child={toMYR(data.fund.limit_spend)}
			/>
			<List
				title={"Start Use"}
				child={dayjs(data.fund.start_use).format("DD MMM YYYY")}
			/>
			<List
				title={"Expired"}
				child={dayjs(data.fund.expired).format("DD MMM YYYY")}
			/>
		</View>
	);
};

export default CouponDetail;

const List = ({ title, child }) => {
	return (
		<View style={transactionDetailsStyle.list}>
			<Text style={transactionDetailsStyle.title}>{title}</Text>
			<Text style={transactionDetailsStyle.child}>{child}</Text>
		</View>
	);
};

const transactionDetailsStyle = StyleSheet.create({
	list: {
		marginTop: 10,
		paddingHorizontal: 14,
		paddingVertical: 16,
		borderRadius: 9,
		borderWidth: 1,
		borderColor: "rgba(0, 0, 0, 0.08)",
		backgroundColor: "#FFF",
	},
	title: {
		fontSize: 12,
		marginBottom: 18,
		color: "rgba(0,0,0,0.48)",
	},
	child: {
		fontWeight: "500",
	},
});
