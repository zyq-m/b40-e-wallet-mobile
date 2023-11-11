import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";

import { Button } from "../../components";
import { useUserContext } from "../../hooks";

import { globals, payNowStyle } from "../../styles";

const PayNow = ({ navigation }) => {
  const [active, setActive] = useState({ btn1: true, btn2: false });

  const onActive = (value) => {
    if ("btn1" === value) {
      setActive({ btn1: true, btn2: false });
    }
    if ("btn2" === value) {
      setActive({ btn1: false, btn2: true });
    }
  };

  const onRoute = () => {
    let amount = 0;
    if (active.btn1) {
      amount = 1;
    } else {
      amount = 2;
    }

    if (Platform.OS === "web") {
      navigation.navigate("Cafe List", { amount: amount });
    } else {
      navigation.navigate("QR Scan", { amount: amount });
    }
  };

  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[payNowStyle.textCenter, payNowStyle.payHeader]}>
          Choose your amount
        </Text>
        <TouchableOpacity onPress={() => onActive("btn1")}>
          <Text
            style={[
              payNowStyle.textCenter,
              payNowStyle.payAmount,
              active.btn1 && payNowStyle.active,
            ]}
          >
            RM 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onActive("btn2")}>
          <Text
            style={[
              payNowStyle.textCenter,
              payNowStyle.payAmount,
              active.btn2 && payNowStyle.active,
            ]}
          >
            RM 2
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 24 }}>
        <Button label={"Next"} onPress={onRoute} />
      </View>
    </View>
  );
};

export default PayNow;
