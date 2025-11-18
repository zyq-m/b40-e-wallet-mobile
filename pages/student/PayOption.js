import { View, Text, StyleSheet, Pressable } from "react-native";
import { globals } from "../../styles";
import { List, QrCode } from "lucide-react-native";

export default function PayOption({ navigation, route }) {
	return (
		<View
			style={[
				globals.container,
				{ paddingHorizontal: 16, justifyContent: "center", gap: 12 },
			]}
		>
			<Pressable onPress={() => navigation.navigate("Cafe List", route.params)}>
				<View style={PayOpStyle.item}>
					<Text>Choose Cafe</Text>
					<List size={20} />
				</View>
			</Pressable>

			<Pressable onPress={() => navigation.navigate("WebScan", route.params)}>
				<View style={PayOpStyle.item}>
					<Text>Scan QR Code</Text>
					<QrCode size={20} />
				</View>
			</Pressable>
		</View>
	);
}

const PayOpStyle = StyleSheet.create({
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 24,
		borderRadius: 6,
		backgroundColor: "rgba(255, 255, 255, 1)",
	},
});
