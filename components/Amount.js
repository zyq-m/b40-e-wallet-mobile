import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import toMYR from "../utils/toMYR";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/Feather";
import TransactionContainer from "./TransactionContainer";
import { useNavigation } from "@react-navigation/native";

const Amount = ({ coupons, student, amount }) => {
	const [isCollapse, setIsCollapse] = useState(false);
	const navigate = useNavigation();

	return (
		<>
			<TouchableOpacity
				activeOpacity={0.75}
				style={amountStyle.amountContainer}
				onPress={() => setIsCollapse(!isCollapse)}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text
						style={[
							amountStyle.amountSmallText,
							{ fontSize: 12, fontWeight: "500" },
						]}
					>
						{student ? "My Balance" : "Total"}
					</Text>
					{student && (
						<Icon
							name="chevron-down"
							size={18}
							color="rgba(255, 255, 255, 1)"
						/>
					)}
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "baseline",
					}}
				>
					<Text style={amountStyle.amountBigText}>
						{toMYR(amount)}
					</Text>
					{student && (
						<Text
							style={[
								amountStyle.amountSmallText,
								{ fontSize: 10 },
							]}
						>
							Valid till{" "}
							{dayjs(coupons?.[0].fund.expired).format(
								"DD/MM/YYYY"
							)}
						</Text>
					)}
				</View>
			</TouchableOpacity>
			{isCollapse && student && (
				<TransactionContainer>
					{coupons?.map((coupon, i) => (
						<TouchableOpacity
							activeOpacity={0.75}
							key={coupon.id}
							onPress={() =>
								navigate.navigate("Coupon Details", {
									data: coupon,
								})
							}
							style={[
								{
									paddingHorizontal: 20,
									paddingVertical: 16,
									backgroundColor: "white",
								},
								i != 0 && {
									borderTopColor: "rgba(0, 0, 0, 0.11)",
									borderTopWidth: 1,
								},
							]}
						>
							<Text>
								{coupon.fund.name}: {toMYR(coupon.balance)}
							</Text>
						</TouchableOpacity>
					))}
				</TransactionContainer>
			)}
		</>
	);
};

const amountStyle = StyleSheet.create({
	amountContainer: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: "rgba(88, 83, 76, 1)",
		borderRadius: 9,
		marginBottom: 2,
	},
	amountSmallText: {
		color: "rgba(186, 186, 186, 1)",
	},
	amountBigText: {
		marginTop: 7,
		color: "rgba(255, 255, 255, 1)",
		fontSize: 24,
		fontWeight: "700",
	},
});

export default Amount;
