import { View, Text, TouchableOpacity } from "react-native";

import { Button } from "../../components";
import { useCoupon } from "../../hooks";

import { globals, payNowStyle } from "../../styles";

const CouponList = ({ navigation, route }) => {
	const { coupons, onSelect } = useCoupon();

	const onRoute = () => {
		coupons
			.filter((coupon) => coupon.active)
			.forEach((coupon) => {
				navigation.navigate("Cafe List", {
					...route.params,
					fundId: coupon.fund.id,
				});
			});
	};

	return (
		<View style={[globals.container, { paddingHorizontal: 16 }]}>
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Text style={[payNowStyle.textCenter, payNowStyle.payHeader]}>
					My Coupons
				</Text>
				{coupons?.map((op) => {
					return (
						<TouchableOpacity
							key={op.id}
							onPress={() => onSelect(op.id)}
						>
							<Text
								style={[
									payNowStyle.textCenter,
									payNowStyle.payAmount,
									op.active && payNowStyle.active,
								]}
							>
								{op.fund.name}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
			<View style={{ paddingBottom: 24 }}>
				<Button label={"Next"} onPress={onRoute} />
			</View>
		</View>
	);
};

export default CouponList;
