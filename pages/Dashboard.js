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

import { globals, dashboardStyle } from "../styles";

const Dashboard = ({ navigation, route }) => {
  const { user } = useUserContext();
  const { dashboard } = useDashboard();
  const [profile, setProfile] = useState({});

  const btn = {
    label: user?.role == "CAFE" ? "My QRCode" : "Pay",
    nav: () =>
      navigation.navigate(user?.role == "CAFE" ? "My QRCode" : "Pay", {
        loyalty: false,
      }),
  };

  useEffect(() => {
    setProfile(dashboard);
  }, [dashboard]);

  return (
    <View style={[globals.container, { paddingTop: 16 }]}>
      <Refresh dashboard={true}>
        <View style={dashboardStyle.logoutContainer}>
          <Profile textField1={profile?.name} textField2={user?.id} />
        </View>
        <View style={{ marginTop: 24 }}>
          <Amount amount={profile?.total} student={user.student} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button label={btn.label} onPress={btn.nav} />
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
                onPress={() => navigation.navigate("Transactions")}
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
          <Text style={[dashboardStyle.transactionHeader, { marginTop: 40 }]}>
            No recent transactions
          </Text>
        )}
      </Refresh>
    </View>
  );
};

export default Dashboard;
