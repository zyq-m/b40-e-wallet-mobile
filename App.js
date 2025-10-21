import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
	CafeList,
	Dashboard,
	Login,
	MyQRCode,
	PayNow,
	QRScan,
	Transaction,
	TransactionDetail,
	Report,
	ChangePassword,
	Profile,
	CouponList,
	CouponDetail,
	SuccessTf,
	Signup,
} from "./pages";
import { UserContext } from "./context/UserContext";
import { useUserContext } from "./hooks";
import { getObject } from "./utils/asyncStorage";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
	const { user } = useUserContext();

	return (
		<Drawer.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				drawerStyle: { paddingTop: 16 },
				drawerActiveTintColor: "rgba(88, 83, 76, 1)",
				headerStyle: { backgroundColor: "#FFD400" },
			}}
		>
			<Drawer.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					title: "eKupon@UniSZA",
					drawerLabel: "Home",
				}}
			/>
			{user?.role === "CAFE" && (
				<>
					<Drawer.Screen
						name="Profile"
						component={Profile}
						options={{
							headerTitle: "Update profile",
						}}
					/>
				</>
			)}

			<Drawer.Screen name="Transactions History" component={Transaction} />
			<Drawer.Screen name="Change password" component={ChangePassword} />
			<Drawer.Screen
				name="Report"
				component={Report}
				options={{
					headerTitle: "Report a problem",
				}}
			/>
		</Drawer.Navigator>
	);
}

export default function App() {
	const [user, setUser] = useState({
		dashboard: { refresh: false },
		transaction: { refresh: false },
		cafeList: { refresh: false },
		qr: { refresh: false },
	});

	const loadContext = async () => {
		try {
			const userDetail = await getObject("userDetails");

			setUser((prev) => ({
				...prev,
				id: userDetail?.id,
				isSignedIn: userDetail?.isSignedIn,
				role: userDetail?.role,
			}));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadContext();
	}, []);

	return (
		<NavigationContainer>
			<UserContext.Provider value={{ user, setUser }}>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerStyle: { backgroundColor: "#FFD400" },
						animation: "fade_from_bottom",
					}}
				>
					{user?.isSignedIn ? (
						<>
							<Stack.Screen
								name="Home"
								component={Home}
								options={{ headerShown: false }}
							/>
							<Stack.Screen name="Transactions" component={Transaction} />
							<Stack.Screen
								name="Transaction Details"
								component={TransactionDetail}
							/>
							{user?.role === "STUDENT" && (
								<>
									<Stack.Screen
										name="Cafe List"
										component={CafeList}
										options={{
											title: "Choose a cafe",
										}}
									/>
									<Stack.Screen
										name="QR Scan"
										component={QRScan}
										options={{
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="Pay"
										component={PayNow}
										options={{
											title: "Payment Details",
										}}
									/>
									<Stack.Screen
										name="Coupon List"
										component={CouponList}
										options={{
											title: "Choose coupon",
										}}
									/>
									<Stack.Screen
										name="Coupon Details"
										component={CouponDetail}
									/>
									<Stack.Screen
										name="SuccessTf"
										options={{ headerShown: false }}
										component={SuccessTf}
									/>
								</>
							)}
							{user?.role === "CAFE" && (
								<>
									<Stack.Screen name="Profile" component={Profile} />
									<Stack.Screen name="My QRCode" component={MyQRCode} />
									<Stack.Screen name="One-time QRCode" component={MyQRCode} />
									<Stack.Screen name="Green Campus" component={MyQRCode} />
									<Stack.Screen name="Cashless" component={MyQRCode} />
								</>
							)}
						</>
					) : (
						<>
							<Stack.Screen
								name="login"
								component={Login}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="signup"
								component={Signup}
								options={{ headerShown: false }}
							/>
						</>
					)}
				</Stack.Navigator>
				<StatusBar style="auto" />
			</UserContext.Provider>
		</NavigationContainer>
	);
}
