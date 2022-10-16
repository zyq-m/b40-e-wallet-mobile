import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  CafeList,
  Dashboard,
  Login,
  MyQRCode,
  PayNow,
  QRScan,
  Transaction,
  TransactionDetail,
} from "./pages";
import { UserContext } from "./lib/Context";
import { getValueFor } from "./utils/SecureStore";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({
    id: undefined,
    student: false,
    refresh: false,
    accessToken: null,
  });

  const getInitialValue = async () => {
    try {
      const id = await getValueFor("id");
      const student = await getValueFor("student");
      const accessToken = await getValueFor("accessToken");

      setUser(prev => ({
        ...prev,
        id: id,
        student: JSON.parse(student),
        accessToken: accessToken,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInitialValue();
  }, []);

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#FFD400" },
            animation: "fade_from_bottom",
          }}>
          {user.accessToken !== null ? (
            <>
              <Stack.Screen name="QR Scan" component={QRScan} />
              <Stack.Screen
                name="Pay"
                component={PayNow}
                options={{
                  title: "Choose amount",
                }}
              />
              <Stack.Screen
                name="Cafe List"
                component={CafeList}
                options={{
                  title: "Choose a cafe",
                }}
              />
              <Stack.Screen name="My QRCode" component={MyQRCode} />
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Transactions" component={Transaction} />
              <Stack.Screen
                name="Transaction Details"
                component={TransactionDetail}
              />
            </>
          ) : (
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </UserContext.Provider>
    </NavigationContainer>
  );
}
