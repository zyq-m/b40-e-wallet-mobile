import { useEffect, useState } from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";

import { Button, Refresh } from "../components";

import { useUserContext } from "../hooks";
import { getCafe, setTransactions } from "../lib/API";
import { ws } from "../lib/Socket";

import { globals } from "../styles";

const CafeList = ({ navigation, route }) => {
  const { amount } = route.params;
  const { user } = useUserContext();

  const [radioBtn, setRadioBtn] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState("");

  const onSelected = i =>
    setRadioBtn(prev =>
      prev.map(data => {
        if (data.id == i) {
          setSelectedCafe(data.value);
          return { ...data, selected: true };
        } else {
          return { ...data, selected: false };
        }
      })
    );

  const onPress = () => {
    if (selectedCafe) {
      ws.emit("pay", selectedCafe, user.id, amount);
      ws.on("pay_detail", () => {
        ws.emit("get_student", user.id);
        ws.emit("get_transaction_cafe", selectedCafe);
        ws.emit("get_transaction_student", user.id);

        alert("Payment successful👍");
        navigation.navigate("Dashboard");

        // remove socket to avoid looping ascendingly
        ws.removeAllListeners("pay_detail");
      });
    }
  };

  const fetchCafe = signal => {
    getCafe(signal)
      .then(res => {
        let newArr = res.map((data, i) => ({
          id: i,
          label: data.cafe_name,
          value: data.username,
          selected: false,
        }));

        setRadioBtn(newArr);
      })
      .catch(() => alert("Please login again"));
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchCafe(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    user.cafeList.refresh && fetchCafe();
  }, [user.cafeList.refresh]);

  return (
    <View style={[globals.container]}>
      <Refresh cafeList={true}>
        <View style={{ flex: 1, justifyContent: "center", marginVertical: 16 }}>
          {radioBtn.map(({ id, label, value, selected }) => {
            return (
              <RadioButton
                key={id}
                id={id}
                label={label}
                value={value}
                selected={selected}
                labelStyle={{ fontSize: 16 }}
                containerStyle={{ marginTop: 16 }}
                onPress={() => onSelected(id)}
              />
            );
          })}
        </View>
      </Refresh>
      <View style={{ paddingBottom: 24, paddingHorizontal: 16 }}>
        <Button label={"Confirm"} onPress={onPress} />
      </View>
    </View>
  );
};

export default CafeList;
