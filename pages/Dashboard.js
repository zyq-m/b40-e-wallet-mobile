import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import {
	Profile,
	Amount,
	TransactionContainer,
	Refresh,
	TransactionList,
} from "../components";

import { useUserContext, useDashboard } from "../hooks";

import { globals, dashboardStyle } from "../styles";

const Dashboard = ({ navigation, route }) => {
	const { user } = useUserContext();
	const { dashboard } = useDashboard();
	const [profile, setProfile] = useState({});

	useEffect(() => {
		setProfile(dashboard);
	}, [dashboard]);

	console.log(profile);

	return (
		<View style={[globals.container, { paddingTop: 16 }]}>
			<Refresh dashboard={true}>
				<View style={dashboardStyle.logoutContainer}>
					<Profile
						textField1={profile?.name}
						textField2={profile?.id}
					/>
				</View>
				<View style={{ marginTop: 24, gap: 4 }}>
					{profile?.coupons ? (
						profile.coupons.map((coupon) => (
							<Amount
								key={coupon.id}
								student={true}
								coupon={coupon}
								studentName={profile?.name}
							/>
						))
					) : (
						<Amount amount={profile?.total} />
					)}
				</View>
				{profile?.transaction?.length ? (
					<View style={{ marginTop: 40, marginBottom: 24 }}>
						<View style={[dashboardStyle.transactionHeaderWrap]}>
							<Text style={dashboardStyle.transactionHeader}>
								Recent transaction
							</Text>
							<FeatherIcon
								name="more-horizontal"
								size={25}
								onPress={() =>
									navigation.navigate("Transactions")
								}
							/>
						</View>
						<TransactionContainer>
							<TransactionList
								params={route.params}
								data={profile?.transaction}
								navigation={navigation}
								user={user}
							/>
						</TransactionContainer>
					</View>
				) : (
					<Text
						style={[
							dashboardStyle.transactionHeader,
							{ marginTop: 40 },
						]}
					>
						No recent transactions
					</Text>
				)}
			</Refresh>
		</View>
	);
};

export default Dashboard;
