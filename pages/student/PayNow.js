import { View, Text, TouchableOpacity } from "react-native";

import { Button } from "../../components";
import { usePayNow } from "../../hooks";

import { globals, payNowStyle } from "../../styles";

const PayNow = ({ navigation, route }) => {
  const { loyalty } = route.params;
  const { onActive, page } = usePayNow({ loyalty });

  const onRoute = () => {
    page.option.forEach((e) => {
      if (e.active) {
        navigation.navigate(e.screen, { amount: e.value });
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
