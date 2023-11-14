import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "../../components";
import { popupMessage } from "../../utils/popupMessage";

import { api } from "../../services/axiosInstance";
import { useUserContext } from "../../hooks";

import { globals, insertPinStyle } from "../../styles";

const InsertPin = ({ navigation, route }) => {
  const { user } = useUserContext();
  const { cafeId, amount, pointId } = route.params;
  const [pin, setPin] = useState("");

  const onCollect = () => {
    api
      .post("/student/point/collect", {
        matricNo: user.id,
        cafeId: cafeId,
        amount: amount,
        pointId: pointId,
        otp: pin,
      })
      .then(() => {
        setPin("");
        // Push notification
        // navigation.navigate("Dashboard");
      })
      .catch((e) => {
        popupMessage({ title: "Alert", message: e.response.data?.message });
        console.log(e);
      });
  };

  return (
    <View
      style={[
        globals.container,
        { justifyContent: "center", paddingHorizontal: 16 },
      ]}
    >
      <View>
        <Text style={insertPinStyle.textHeader}>Please Insert PIN Code</Text>
        <Input label={"Insert PIN code here"} onChange={setPin} />
        <View style={{ marginTop: 30 }}>
          <Button label={"Collect"} onPress={onCollect} />
        </View>
      </View>
    </View>
  );
};

export default InsertPin;
