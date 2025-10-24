import { View, Text } from "react-native";
import { useEffect, useState } from "react";

import { popupMessage } from "../utils/popupMessage";
import { Button, Input } from "../components";

import { globals, loginStyle } from "../styles";
import DropDownPicker from "react-native-dropdown-picker";
import { api } from "../services/axiosInstance";
import axios from "axios";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [rePass, setRepass] = useState("");
	const [staffNo, setNo] = useState("");

	const [open, setOpen] = useState(false);
	const [ptj, setPtj] = useState("");
	const [items, setItems] = useState([{ label: "FSK", value: 1 }]);

	const onSubmit = async ({ navigation }) => {
		try {
			const newAcc = await api.post("/auth/register", {
				email: email,
				password: password,
				repass: rePass,
				name: name,
				ptj: ptj,
				noStaff: staffNo,
			});

			popupMessage(newAcc.data);
			navigation.navigate("login");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				popupMessage(error.response.data);
			}
		}
	};

	useEffect(() => {
		api.get("/lookup/ptj").then((res) => {
			setItems(res.data.map(({ id, ptj }) => ({ label: ptj, value: id })));
		});
	}, []);

	return (
		<View
			style={[
				globals.container,
				{ justifyContent: "center", paddingHorizontal: 16 },
			]}
		>
			<View>
				<Text style={loginStyle.loginHeader}>Create your account</Text>
				<Input label={"Name"} value={name} onChange={setName} />
				<Input label={"Staff No."} value={staffNo} onChange={setNo} />
				<Text style={loginStyle.inputLabel}>PTJ</Text>
				<DropDownPicker
					open={open}
					value={ptj}
					items={items}
					setOpen={setOpen}
					setValue={setPtj}
					setItems={setItems}
					style={loginStyle.inputContainer}
					placeholder="Choose one"
					dropDownContainerStyle={{
						borderColor: "rgba(0, 0, 0, 0.11)",
						backgroundColor: "rgba(255, 255, 255, 1)",
					}}
					searchable={true}
					searchTextInputStyle={{
						borderColor: "rgba(0, 0, 0, 0.11)",
						backgroundColor: "rgba(255, 255, 255, 1)",
					}}
					searchPlaceholder="Find your PTJ..."
				/>
				<Input label={"Email"} value={email} onChange={setEmail} />
				<Input
					label={"Password"}
					secure={true}
					value={password}
					onChange={setPassword}
				/>
				<Input
					label={"Retype password"}
					secure={true}
					value={rePass}
					onChange={setRepass}
				/>
				<View style={{ marginTop: 37 }}>
					<Button label={"Sign Up"} onPress={onSubmit} />
				</View>
			</View>
		</View>
	);
};

export default Signup;
