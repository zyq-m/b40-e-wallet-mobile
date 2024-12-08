import React from "react";
import { View, Text, StyleSheet } from "react-native";
import toMYR from "../utils/toMYR";

const Amount = ({ amount, student }) => {
	return (
		<View style={amountStyle.amountContainer}>
			<Text
				style={[
					amountStyle.amountSmallText,
					{ fontSize: 12, fontWeight: "500" },
				]}
			>
				{student ? "My Balance" : "Total"}
			</Text>
			<Text style={amountStyle.amountBigText}>{toMYR(amount)}</Text>
			{/* {student && (
        <Text style={[amountStyle.amountSmallText, { fontSize: 10 }]}>
          Valid till the end of semester
        </Text>
      )} */}
		</View>
	);
};

const amountStyle = StyleSheet.create({
	amountContainer: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		backgroundColor: "rgba(88, 83, 76, 1)",
		borderRadius: 9,
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
