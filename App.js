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
  InsertPin,
  MyPin,
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
        // initialParams={{
        //   loyalty: user?.role === "PAYNET" ? true : false,
        // }}
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
          {/* <Drawer.Screen name="One-time pin" component={MyPin} /> */}
        </>
      )}
      {/* {["PAYNET", "B40", "MAIDAM"].includes(user?.role) && (
        <>
          <Drawer.Screen
            name="Point Claimed"
            component={Transaction}
            initialParams={{ loyalty: true }}
          />
        </>
      )} */}
      {["CAFE", "B40", "MAIDAM", "PAYNET", "TILAWAH"].includes(user?.role) && (
        <>
          <Drawer.Screen name="Transactions History" component={Transaction} />
        </>
      )}
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
              {/* <Stack.Screen
                name="Collect Point"
                component={PayNow}
                options={{
                  title: "Choose campaign",
                }}
              /> */}
              {/* <Stack.Screen name="Insert Pin" component={InsertPin} /> */}
              <Stack.Screen name="Transactions" component={Transaction} />
              <Stack.Screen
                name="Transaction Details"
                component={TransactionDetail}
              />
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
              {["B40", "MAIDAM", "PAYNET", "TILAWAH"].includes(user.role) && (
                <>
                  <Stack.Screen
                    name="Pay"
                    component={PayNow}
                    options={{
                      title: "Choose amount",
                    }}
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
                  <Drawer.Screen name="One-time pin" component={MyPin} />
                </>
              )}
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
