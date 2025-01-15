import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import toMYR from "../utils/toMYR";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { ArrowRightLeft, QrCode } from "lucide-react-native";

const Amount = ({ coupon, student, amount, studentName }) => {
	const navigation = useNavigation();

	function onPress() {
		if (student) {
			navigation.navigate("Pay", {
				fundId: coupon.fund_id,
				name: studentName,
				coupon: coupon.fund.name,
			});
		} else {
			navigation.navigate("My QRCode");
		}
	}

	return (
		<>
			<TouchableOpacity
				activeOpacity={0.75}
				style={amountStyle.amountContainer}
				onPress={onPress}
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
						{student ? coupon?.fund.name : "Total earns"}
					</Text>
					{student ? (
						<ArrowRightLeft size={18} color="rgba(255,212,0,1)" />
					) : (
						<QrCode size={18} color="rgba(255,212,0,1)" />
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
						{toMYR(student ? coupon.balance : amount)}
					</Text>
					{student && (
						<Text
							style={[
								amountStyle.amountSmallText,
								{ fontSize: 10 },
							]}
						>
							Exp{" "}
							{dayjs(coupon?.fund.expired).format("DD/MM/YYYY")}
						</Text>
					)}
				</View>
			</TouchableOpacity>
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
