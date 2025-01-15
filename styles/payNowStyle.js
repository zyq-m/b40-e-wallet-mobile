import { StyleSheet } from "react-native";

const payNowStyle = StyleSheet.create({
	textCenter: {
		textAlign: "center",
	},
	payHeader: {
		marginBottom: 26,
		fontSize: 20,
		fontWeight: "700",
		color: "rgba(121, 121, 121, 1)",
	},
	payAmount: {
		paddingVertical: 16,
		fontSize: 24,
		fontWeight: "600",
		color: "rgba(88, 83, 76, 1)",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 9,
	},
	active: {
		color: "white",
		backgroundColor: "rgba(88, 83, 76, 1)",
		borderRadius: 9,
	},
});

export default payNowStyle;
