import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Alert,
} from "react-native";
import CheckBox from "expo-checkbox";
import { api } from "../services/axiosInstance";
import { popupMessage } from "../utils/popupMessage";

const TransactionItem = ({
	navigate,
	noBorder,
	field1,
	time,
	date,
	amount,
	role,
	approved,
	transactionId,
	style,
	params,
}) => {
	const [checked, setChecked] = useState(approved);

	const updateChecked = () => {
		api.put("/api/transactions/approved", {
			transactionId: transactionId,
			value: !checked,
		})
			.then(() => setChecked(!checked))
			.catch(() => {
				popupMessage({ title: "Error", message: "Please try again" });
			});
	};

	const handleCheck = () => {
		if (!checked) {
			updateChecked();
		} else {
			if (Platform.OS === "web") {
				confirm("Are you sure?") && updateChecked();
				return false;
			}

			Alert.alert("Important", "Are you sure?", [
				{ text: "Cancel", onPress: () => false },
				{ text: "Ok", onPress: () => updateChecked() },
			]);
		}
	};

	return (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={navigate}
			style={[
				transactionItemStyle.transactionItem,
				noBorder ? "" : transactionItemStyle.transactionItemBorder,
				style,
			]}
		>
			<View
				style={[
					{
						paddingLeft: 20,
						paddingVertical: 16,
						maxWidth: "70%",
					},
				]}
			>
				<Text
					numberOfLines={1}
					style={{ fontWeight: "500", marginBottom: 2 }}
				>
					{field1}
				</Text>
				<View style={{ flexDirection: "row" }}>
					<Text style={transactionItemStyle.transactionSmallTxt}>
						{time}
					</Text>
					<Text
						style={[
							transactionItemStyle.transactionSmallTxt,
							{ marginLeft: 12 },
						]}
					>
						{date}
					</Text>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Text
					style={[
						transactionItemStyle.transactionAmount,
						{ paddingRight: 20 },
					]}
				>
					{amount}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const TransactionCheckBox = ({ handleCheck, checked }) => {
	if (Platform.OS === "web") {
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={transactionItemStyle.checkBox}
			>
				<CheckBox
					value={checked}
					style={{ padding: 9 }}
					onValueChange={handleCheck}
				/>
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity
				activeOpacity={1}
				onPress={handleCheck}
				style={transactionItemStyle.checkBox}
			>
				<CheckBox
					value={checked}
					style={{ padding: 9 }}
					onValueChange={handleCheck}
				/>
			</TouchableOpacity>
		);
	}
};

const transactionItemStyle = StyleSheet.create({
	transactionItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
	transactionItemBorder: {
		borderTopColor: "rgba(0, 0, 0, 0.11)",
		borderTopWidth: 1,
	},
	transactionSmallTxt: {
		fontSize: 9,
		color: "rgba(0, 0, 0, 0.47)",
	},
	transactionAmount: {
		paddingVertical: 16,
		fontSize: 12,
		fontWeight: "600",
	},
	checkBox: {
		paddingVertical: 16,
		paddingRight: 20,
		paddingLeft: 12,
	},
});

export default TransactionItem;
