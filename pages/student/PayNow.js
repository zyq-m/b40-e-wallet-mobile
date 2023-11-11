import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";

import { Button } from "../../components";
import { useUserContext } from "../../hooks";

import { globals, payNowStyle } from "../../styles";

const PayNow = ({ navigation, route }) => {
  const [page, setPage] = useState({});
  const { loyalty } = route.params;

  useEffect(() => {
    if (!loyalty) {
      setPage({
        title: "Choose an amount",
        option: [
          {
            id: 1,
            name: "RM 1",
            amount: 1,
            active: true,
            screen: Platform.OS === "web" ? "Cafe List" : "QR Scan",
          },
          {
            id: 2,
            name: "RM 2",
            amount: 2,
            active: false,
            screen: Platform.OS === "web" ? "Cafe List" : "QR Scan",
          },
        ],
      });
    } else {
      setPage({
        title: "Choose a campaign",
        option: [
          {
            id: 1,
            name: "Cashless",
            amount: 1,
            active: true,
            screen: "Cashless",
          },
          {
            id: 2,
            name: "Green Campus",
            amount: 1,
            active: false,
            screen: "Green Campus",
          },
        ],
      });
    }
  }, []);

  const onActive = (value) => {
    setPage((prev) => {
      const title = prev.title;
      const option = prev.option.map((e) => {
        let returnVal = { ...e };
        if (e.id === value) {
          returnVal.active = true;
        } else {
          returnVal.active = false;
        }

        return returnVal;
      });

      return { title, option };
    });
  };

  const onRoute = () => {
    page.option.forEach((e) => {
      if (e.active) {
        navigation.navigate(e.screen, { amount: e.amount });
      }
    });
  };

  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[payNowStyle.textCenter, payNowStyle.payHeader]}>
          {page?.title}
        </Text>
        {page?.option?.map((op) => {
          return (
            <TouchableOpacity key={op.id} onPress={() => onActive(op.id)}>
              <Text
                style={[
                  payNowStyle.textCenter,
                  payNowStyle.payAmount,
                  op.active && payNowStyle.active,
                ]}
              >
                {op.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ paddingBottom: 24 }}>
        <Button label={"Next"} onPress={onRoute} />
      </View>
    </View>
  );
};

export default PayNow;
