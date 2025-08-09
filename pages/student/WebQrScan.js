import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../services/axiosInstance";

export default function WebQrScan({ navigation, route }) {
	const params = route.params;
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [qrRes, setQrRes] = useState(null);

	useEffect(() => {
		if (qrRes) {
			onScan(qrRes);
		}
	}, [qrRes]);

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	async function onScan(data) {
		function getUrlParams(url) {
			let params = {};
			let parts = url.replace(
				/[?&]+([^=&]+)=([^&]*)/gi,
				function (m, key, value) {
					params[key] = value;
				}
			);
			return params;
		}

		const urlParams = getUrlParams(data);

		// Validate qr
		if (Object.entries(urlParams).length === 0) {
			alert("Invalid QR Code. Please try again");
			return;
		}

		try {
			const res = await api.get(`/cafe/${urlParams.id}`);

			navigation.navigate("InsertAmount", {
				...params,
				cafeId: res.data.id,
				cafeName: res.data.cafe_name,
			});
		} catch (error) {
			alert("Cafe not found");
		}
	}

	return (
		<View style={styles.container}>
			<Camera
				style={styles.camera}
				type={type}
				onBarCodeScanned={(res) => setQrRes(res.data)}
				barCodeScannerSettings={{
					barCodeTypes: ["qr"],
				}}
			></Camera>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});
