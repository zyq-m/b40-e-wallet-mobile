import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { globals } from "../../styles";
import { Button, Card } from "../../components";
import { SquareCheckBig, X } from "lucide-react-native";
import dayjs from "dayjs";
import toMYR from "../../utils/toMYR";

const SuccessTf = ({ navigation, route }) => {
	const params = route.params;

	return (
		<View style={[globals.container]}>
			<View
				style={{
					backgroundColor: "rgba(255,212,0,1)",
					paddingVertical: 24,
				}}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate("Home")}
					style={{
						paddingLeft: 16,
						position: "absolute",
						left: 0,
						zIndex: 1,
					}}
				>
					<X />
				</TouchableOpacity>
				<Text
					style={[
						style.textCenter,
						{
							fontWeight: "500",
							fontSize: 17,
						},
					]}
				>
					Payment Successful
				</Text>
			</View>
			<View
				style={{
					flex: 1,
					position: "relative",
					paddingHorizontal: 16,
					paddingTop: 24,
				}}
			>
				<View style={{ marginVertical: 48 }}>
					<SquareCheckBig
						size={60}
						color={"rgb(114, 205, 34)"}
						style={{ alignSelf: "center", marginBottom: 16 }}
					/>
					<Text style={style.textCenter}>Amount</Text>
					<Text
						style={[
							style.textCenter,
							{
								fontWeight: "600",
								fontSize: 24,
							},
						]}
					>
						{toMYR(params?.tf.amount)}
					</Text>
				</View>
				<Card style={{ gap: 16 }}>
					<View>
						<Text style={style.label}>Reference Id</Text>
						<Text style={style.desc}>{params?.tf.id}</Text>
					</View>
					<View>
						<Text style={style.label}>From</Text>
						<Text style={style.desc}>{params?.tf.student.name}</Text>
					</View>
					<View>
						<Text style={style.label}>To</Text>
						<Text style={style.desc}>{params?.tf.cafe.cafe_name}</Text>
					</View>
					<View>
						<Text style={style.label}>Time</Text>
						<Text style={style.desc}>
							{dayjs(params?.tf.timestamp).format("D MMM YYYY hh:mmA")}
						</Text>
					</View>
					<View>
						<Text style={style.label}>Coupon</Text>
						<Text style={style.desc}>{params?.tf.fund.name}</Text>
					</View>
				</Card>
			</View>
			<View style={{ paddingBottom: 24, paddingHorizontal: 16 }}>
				<Button
					label="MAKE NEW PAYMENT"
					muted={true}
					onPress={() => navigation.navigate("Home")}
				/>
			</View>
		</View>
	);
};

export default SuccessTf;

const style = StyleSheet.create({
	label: {
		fontSize: 12,
		color: "rgb(92, 92, 92)",
	},
	desc: {
		fontSize: 16,
	},
	textCenter: {
		textAlign: "center",
	},
});
