import { StyleSheet, View } from "react-native";
import React from "react";

const Card = ({ children, style }) => (
	<View style={[cardStyle.list, style]}>{children}</View>
);

export default Card;

const cardStyle = StyleSheet.create({
	list: {
		position: "relative",
		zIndex: 1000,
		marginTop: 10,
		paddingHorizontal: 16,
		paddingVertical: 24,
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
