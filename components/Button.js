import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ label, onPress, disable, muted }) => {
	return (
		<TouchableOpacity
			style={{ flex: 1 }}
			onPress={onPress}
			disabled={disable}
		>
			<Text
				style={[
					buttonStyle.button,
					disable && buttonStyle.disable,
					muted && {
						borderColor: "#ccc",
						borderWidth: 1,
						backgroundColor: "",
					},
				]}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

const buttonStyle = StyleSheet.create({
	button: {
		paddingVertical: 12,
		textAlign: "center",
		fontWeight: "600",
		backgroundColor: "rgba(255,212,0,1)",
		borderRadius: 9,
	},
	disable: {
		backgroundColor: "rgba(215,186,43,1)",
	},
});

export default Button;
