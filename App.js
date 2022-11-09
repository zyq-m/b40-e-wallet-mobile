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
} from "./pages";
import { UserContext } from "./lib/Context";
import { getValueFor } from "./utils/SecureStore";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerStyle: { paddingTop: 16 },
        drawerActiveTintColor: "rgba(88, 83, 76, 1)",
        headerStyle: { backgroundColor: "#FFD400" },
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "eKupon",
          drawerLabel: "Home",
        }}
      />
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
    id: undefined,
    login: false,
    student: false,
    dashboard: { refresh: false },
    transaction: { refresh: false },
    cafeList: { refresh: false },
  });

  const getInitialValue = async () => {
    try {
      const id = await getValueFor("id");
      const login = await getValueFor("login");
      const student = await getValueFor("student");

      setUser(prev => ({
        ...prev,
        id: id,
        login: JSON.parse(login),
        student: JSON.parse(student),
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
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#FFD400" },
            animation: "fade_from_bottom",
          }}>
          {user.login ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
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
