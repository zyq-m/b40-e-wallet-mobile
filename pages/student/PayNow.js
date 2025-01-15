import { View, Text, TextInput, StyleSheet } from "react-native";

import { Button } from "../../components";
import { useUserContext } from "../../hooks";
import { useEffect, useState } from "react";

import { globals, payNowStyle } from "../../styles";
import DropDownPicker from "react-native-dropdown-picker";
import { api } from "../../services/axiosInstance";
import Modal from "react-native-modal";
import { socket } from "../../services/socket";
import { pay } from "../../api/student/studentApi";
import { popupMessage } from "../../utils/popupMessage";

const PayNow = ({ navigation, route }) => {
	const params = route.params;
	const { user } = useUserContext();
	const [amount, setAmount] = useState("0.00");
	const [disable, setDisable] = useState(true);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
	]);

	const [isModalVisible, setModalVisible] = useState(false);

	function toggleModal() {
		setModalVisible(!isModalVisible);
	}

	async function onConfirm() {
		try {
			toggleModal();
			setDisable(true);
			const res = await pay(params.fundId, amount, user.id, value);

			// emit event
			socket.emit("student:get-wallet-total", { icNo: user?.id });
			socket.emit("cafe:get-sales-total", { cafeId: value });
			socket.emit("admin:get-overall");
			// push notification then nav to dashboard
			socket.emit("notification:send", {
				receiver: value,
				message: {
					title: "Payment recieved",
					body: `You recieved RM${amount} from ${user.id}`,
				},
			});
			// notify self
			socket.emit("notification:send", {
				receiver: user.id,
				message: {
					title: "Payment sent",
					body: `You spent RM${amount} at ${value}`,
				},
			});

			navigation.navigate("SuccessTf", { tf: res.data });
		} catch (error) {
			console.error(error);
			if (error?.response.status == 406) {
				popupMessage({
					title: "Failed",
					message: error.response.data.message,
				});
			}
		}
		setDisable(false);
	}

	useEffect(() => {
		if (value && +amount > 0) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}, [value, amount]);

	useEffect(() => {
		const controller = new AbortController();

		api.get("/cafe", { signal: controller.signal })
			.then((res) => {
				setItems(
					res.data.map((cafe) => ({
						label: cafe.cafe_name,
						value: cafe.id,
					}))
				);
			})
			.catch((error) => {
				console.error(error);
			});

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<View style={[globals.container, { paddingHorizontal: 16 }]}>
			<View style={{ flex: 1 }}>
				<Card>
					<Text style={cardStyle.title}>From</Text>
					<Text
						style={[
							cardStyle.child,
							{
								borderBottomWidth: 1,
								marginBottom: 24,
								paddingBottom: 24,
								borderBottomColor: "rgb(235, 235, 235)",
							},
						]}
					>
						{params?.name}
					</Text>
					<Text style={cardStyle.title}>To</Text>
					<DropDownPicker
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						searchable={true}
						searchPlaceholder="Search..."
						selectedItemLabelStyle={{ textTransform: "capitalize" }}
						searchTextInputStyle={{
							borderColor: "#ccc",
							borderWidth: 1,
							padding: 8,
							paddingLeft: 16,
							borderRadius: 100,
						}}
						placeholder="Choose shop"
						style={{
							borderColor: "#ccc",
							borderWidth: 1,
							padding: 8,
						}}
					/>
					<Text
						style={[
							cardStyle.title,
							{
								borderTopWidth: 1,
								marginTop: 24,
								paddingTop: 24,
								borderTopColor: "rgb(235, 235, 235)",
							},
						]}
					>
						Amount in MYR
					</Text>
					<TextInput
						style={[payNowStyle.textCenter, payNowStyle.payAmount]}
						value={amount}
						onChangeText={setAmount}
						keyboardType="numeric"
					/>
				</Card>

				<Card>
					<Text style={cardStyle.title}>Coupon</Text>
					<Text style={cardStyle.child}>{params?.coupon}</Text>
				</Card>
			</View>
			<Modal isVisible={isModalVisible}>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<View style={[cardStyle.list, { gap: 16 }]}>
						<Text style={{ fontSize: 18, fontWeight: "500" }}>
							Are absolutely sure?
						</Text>
						<Text>
							This action cannot be undone. Your account will be
							deducted.
						</Text>
						<View style={{ flexDirection: "row", gap: 8 }}>
							<Button
								label="Cancel"
								onPress={toggleModal}
								muted={true}
							/>
							<Button label="Confirm" onPress={onConfirm} />
						</View>
					</View>
				</View>
			</Modal>
			<View style={{ paddingBottom: 24 }}>
				<Button
					label={"Submit"}
					disable={disable}
					onPress={toggleModal}
				/>
			</View>
		</View>
	);
};

const Card = ({ children }) => <View style={cardStyle.list}>{children}</View>;

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

export default PayNow;
