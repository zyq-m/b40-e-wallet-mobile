import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ws } from "../lib/Socket";

import {
  Profile,
  Amount,
  TransactionContainer,
  Refresh,
  Button,
  TransactionList,
} from "../components";

import {
  useUserContext,
  usePushNotification,
  useCafe,
  useLogout,
} from "../hooks";
import { popupMessage } from "../utils/popupMessage";

import { globals, dashboardStyle } from "../styles";

const Dashboard = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const [total, setTotal] = useState(0);
  const { schedulePushNotification } = usePushNotification();
  const { cafe } = useCafe({ id: user.id, student: user.student });
  const { onLogout } = useLogout();

  const [students, setStudents] = useState();
  const [transactions, setTransactions] = useState();

  const onNavigate = () => {
    if (user.student) {
      if (students.wallet_amount <= 0)
        return popupMessage({ title: "Sorry", message: "Insufficient amount" });
      navigation.navigate("Pay");
    } else {
      navigation.navigate("My QRCode");
    }
  };

  useEffect(() => {
    // send id to get transaction
    if (user.student) {
      ws.emit("get_transaction_student", user.id);
      // receive new data
      ws.on("set_transaction_student", data => setTransactions(data));

      ws.emit("get_student", user.id);
      ws.on("set_student", data => {
        // set wallet amount, name, matric no
        setStudents(data);
        setUser(prev => ({
          ...prev,
          details: { id: data.matric_no, name: data.student_name },
        }));
      });

      ws.on("get_notification", async notification => {
        if (notification) {
          await schedulePushNotification(notification);
        }
      });
    } else {
      // get sales amount
      ws.emit("get_sales_amount", user.id);
      ws.on("set_sales_amount", data => setTotal(data?.total_sales || 0));

      ws.emit("get_transaction_cafe", user.id);
      ws.on("set_transaction_cafe", data => {
        setTransactions(data);
      });

      ws.on("get_notification", async notification => {
        if (notification) {
          await schedulePushNotification(notification);
        }
      });
    }

    return () => {
      ws.removeAllListeners();
    };
  }, [ws]);

  return (
    <View style={[globals.container, { paddingTop: 16 }]}>
      <Refresh dashboard={true}>
        <View style={dashboardStyle.logoutContainer}>
          <Profile
            textField1={cafe[0]?.cafe_name || students?.student_name}
            textField2={cafe[0]?.username || students?.matric_no}
            onLogout={onLogout}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <Amount
            amount={user.student ? students?.wallet_amount : total}
            student={user.student}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            label={user.student ? "Pay" : "My QRCode"}
            onPress={onNavigate}
          />
        </View>
        <View style={{ marginTop: 40, marginBottom: 24 }}>
          <View style={[dashboardStyle.transactionHeaderWrap]}>
            <Text style={dashboardStyle.transactionHeader}>
              Recent transaction
            </Text>
            <FeatherIcon
              name="more-horizontal"
              size={25}
              onPress={() => navigation.navigate("Transactions")}
            />
          </View>
          <TransactionContainer>
            <TransactionList
              data={transactions}
              navigation={navigation}
              user={user}
              slice={5}
            />
          </TransactionContainer>
        </View>
      </Refresh>
    </View>
  );
};

export default Dashboard;
