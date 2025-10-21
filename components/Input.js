import { View, Text, TextInput, Platform } from "react-native";
import loginStyle from "../styles/loginStyle";

const Input = ({ label, secure, onChange, value }) => {
	return (
		<View>
			<Text style={loginStyle.inputLabel}>{label}</Text>
			<View style={loginStyle.inputContainer}>
				<TextInput
					style={[
						loginStyle.input,
						Platform.OS === "web" && { outlineStyle: "none" },
					]}
					secureTextEntry={secure ? true : false}
					onChangeText={onChange}
					value={value}
				/>
			</View>
		</View>
	);
};

export default Input;
