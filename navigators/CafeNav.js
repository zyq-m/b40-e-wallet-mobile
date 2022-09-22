import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CafeDashboard from "../pages/CafeDashboard";
import Transaction from "../pages/Transaction";
import MyQRCode from "../pages/MyQRCode";

const Stack = createNativeStackNavigator();

const CafeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cafe Dashboard"
        component={CafeDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transaction}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="My QRCode"
        component={MyQRCode}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default CafeNav;
