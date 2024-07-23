import { View, Text, TouchableOpacity, TextInput } from "react-native";

import { Button } from "../../components";
import { usePayNow, useUserContext } from "../../hooks";
import { useState } from "react";

import { globals, payNowStyle } from "../../styles";

const PayNow = ({ navigation, route }) => {
  const { loyalty } = route.params;
  const { user } = useUserContext();
  const { onActive, page, setPage } = usePayNow({ loyalty });
  const [amount, setAmount] = useState("");

  function onAmount(e) {
    setAmount(() => {
      setPage((pagePrev) => {
        pagePrev.option[2].value = e;
        return pagePrev;
      });

      return e;
    });
  }

  const onRoute = () => {
    page.option.forEach((e) => {
      if (e.active) {
        navigation.navigate(e.screen, {
          amount: e.value,
          pointId: e.id,
          loyalty: loyalty,
        });
      }
    });
  };

  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[payNowStyle.textCenter, payNowStyle.payHeader]}>
          {page?.title}
        </Text>
        {page?.option
          ?.filter((op) => !op.role.includes(user.role))
          .map((op) => {
            return (
              <TouchableOpacity key={op.id} onPress={() => onActive(op.id)}>
                {op.name === "Enter amount" ? (
                  <TextInput
                    style={[
                      payNowStyle.textCenter,
                      payNowStyle.payAmount,
                      op.active && payNowStyle.active,
                    ]}
                    value={amount}
                    onChangeText={onAmount}
                    keyboardType="numeric"
                    placeholder={op.name}
                  />
                ) : (
                  <Text
                    style={[
                      payNowStyle.textCenter,
                      payNowStyle.payAmount,
                      op.active && payNowStyle.active,
                    ]}
                  >
                    {op.name}
                  </Text>
                )}
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
