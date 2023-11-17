import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

import {
  Profile,
  Amount,
  TransactionContainer,
  Refresh,
  Button,
  TransactionList,
} from "../components";

import { useUserContext, usePushNotification, useDashboard } from "../hooks";
import { popupMessage } from "../utils/popupMessage";

import { globals, dashboardStyle } from "../styles";

const Dashboard = ({ navigation }) => {
  const { user } = useUserContext();
  const { schedulePushNotification } = usePushNotification();
  const { dashboard } = useDashboard();
  const [profile, setProfile] = useState({});

  const btn = [
    {
      role: "B40",
      btn: [
        {
          label: "Pay",
          nav: () => navigation.navigate("Pay", { loyalty: false }),
        },
        {
          label: "Collect Point",
          nav: () =>
            navigation.navigate(
              Platform.OS === "web" ? "Collect Point" : "QR Scan",
              { loyalty: true }
            ), // create page to collect point
        },
      ],
    },
    {
      role: "CAFE",
      btn: [
        {
          label: "My QRCode",
          nav: () => navigation.navigate("My QRCode", { loyalty: false }),
        },
        {
          label: "One-time QRCode",
          nav: () => navigation.navigate("One-time QRCode", { loyalty: true }),
        },
      ],
    },
    {
      role: "NON-B40",
      btn: [
        {
          label: "Collet Point",
          nav: () =>
            navigation.navigate(
              Platform.OS === "web" ? "Collect Point" : "QR Scan",
              { loyalty: true }
            ),
        },
      ],
    },
  ];

  useEffect(() => {
    setProfile(dashboard);
  }, [dashboard]);

  // useEffect(() => {
  //   // send id to get transaction
  //   if (user.student) {
  //     ws.emit("get_transaction_student", user.id);
  //     // receive new data
  //     ws.on("set_transaction_student", (data) => setTransactions(data));

  //     ws.emit("get_student", user.id);
  //     ws.on("set_student", (data) => {
  //       // set wallet amount, name, matric no
  //       setStudents(data);
  //       setUser((prev) => ({
  //         ...prev,
  //         details: { id: data.matric_no, name: data.student_name },
  //       }));
  //     });

  //     ws.on("get_notification", async (notification) => {
  //       if (notification) {
  //         await schedulePushNotification(notification);
  //       }
  //     });
  //   } else {
  //     // get sales amount
  //     ws.emit("get_sales_amount", user.id);
  //     ws.on("set_sales_amount", (data) => setTotal(data?.total_sales || 0));

  //     ws.emit("get_transaction_cafe", user.id);
  //     ws.on("set_transaction_cafe", (data) => {
  //       setTransactions(data);
  //     });

  //     ws.on("get_notification", async (notification) => {
  //       if (notification) {
  //         await schedulePushNotification(notification);
  //       }
  //     });
  //   }

  //   return () => {
  //     ws.removeAllListeners();
  //   };
  // }, [ws]);

  return (
    <View style={[globals.container, { paddingTop: 16 }]}>
      <Refresh dashboard={true}>
        <View style={dashboardStyle.logoutContainer}>
          <Profile textField1={profile?.name} textField2={user?.id} />
        </View>
        <View style={{ marginTop: 24 }}>
          <Amount amount={profile?.total} student={user.student} />
        </View>
        {btn
          .filter((val) => user?.role === val.role)[0]
          .btn.map((val, i) => {
            return (
              <View key={i} style={{ marginTop: 10 }}>
                <Button label={val.label} onPress={val.nav} />
              </View>
            );
          })}
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
                  navigation.navigate(
                    user.role === "NON-B40" ? "Point Claimed" : "Transactions"
                  )
                }
              />
            </View>
            <TransactionContainer>
              <TransactionList
                data={profile?.transaction}
                navigation={navigation}
                user={user}
              />
            </TransactionContainer>
          </View>
        ) : (
          <Text style={[dashboardStyle.transactionHeader, { marginTop: 40 }]}>
            No recent transactions
          </Text>
        )}
      </Refresh>
    </View>
  );
};

export default Dashboard;
