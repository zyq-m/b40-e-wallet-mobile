import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ws } from "../lib/Socket";

import {
  Profile,
  Amount,
  TransactionContainer,
  TransactionItem,
  Refresh,
  Button,
} from "../components";

import { useUserContext } from "../hooks";
import { deleteItem, getValueFor } from "../utils/SecureStore";
import { countTotal } from "../utils/countTotal";
import { popupMessage } from "../utils/popupMessage";
import { useCafe, usePushNotification } from "../hooks";
import { logout } from "../lib/API";

import { globals, dashboardStyle } from "../styles";

const Dashboard = ({ navigation }) => {
  const { user, setUser } = useUserContext();
  const [total, setTotal] = useState(0);
  const { schedulePushNotification } = usePushNotification();
  const { cafe } = useCafe({ id: user.id, student: user.student });

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

  const onLogout = async () => {
    const refreshToken = await getValueFor("refreshToken");
    ws.emit("logout", user.id);
    await logout(refreshToken);
    await deleteItem("accessToken");
    await deleteItem("refreshToken");
    await deleteItem("id");
    await deleteItem("login");
    await deleteItem("student");
    setUser(prev => ({
      ...prev,
      id: undefined,
      login: false,
      student: false,
    }));
  };

  useEffect(() => {
    transactions && setTotal(countTotal(transactions));
  }, [transactions]);

  useEffect(() => {
    // send id to get transaction
    if (user.student) {
      ws.emit("get_transaction_student", user.id);
      // receive new data
      ws.on("set_transaction_student", msg => setTransactions(msg));

      ws.emit("get_student", user.id);
      ws.on("set_student", data => {
        setStudents(data);
      });

      ws.on("get_notification", async notification => {
        if (notification) {
          await schedulePushNotification(notification);
        }
      });
    } else {
      ws.emit("get_transaction_cafe", user.id);
      ws.on("set_transaction_cafe", async msg => {
        setTransactions(msg);
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
  }, [ws, user.id]);

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
            {transactions
              ?.slice(0, 5)
              .map(
                (
                  {
                    sender,
                    amount,
                    created_at,
                    transaction_id,
                    cafe_name,
                    student_name,
                    approved_by_recipient,
                  },
                  i
                ) => {
                  let details = {
                    sender: `${student_name} (${sender})`,
                    recipient: cafe_name,
                    transactionId: transaction_id,
                    amount: `RM${amount}`,
                    date: `${moment(created_at).format(
                      "D-MM-YYYY"
                    )} at ${moment(created_at).format("h.mma")}`,
                  };

                  return (
                    <TransactionItem
                      key={i}
                      transactionId={transaction_id}
                      approved={approved_by_recipient}
                      field1={sender}
                      time={moment(created_at).format("h.mma")}
                      date={moment(created_at).format("D-MM")}
                      amount={amount}
                      noBorder={i == 0 && true}
                      cafe={!user.student}
                      navigate={() =>
                        navigation.navigate("Transaction Details", {
                          data: details,
                        })
                      }
                    />
                  );
                }
              )}
          </TransactionContainer>
        </View>
      </Refresh>
    </View>
  );
};

export default Dashboard;
