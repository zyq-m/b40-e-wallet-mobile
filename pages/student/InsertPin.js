import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "../../components";
import { popupMessage } from "../../utils/popupMessage";

import { api } from "../../services/axiosInstance";
import { useUserContext } from "../../hooks";
import { socket } from "../../services/socket";

import { globals, insertPinStyle } from "../../styles";

const InsertPin = ({ navigation, route }) => {
  const { user } = useUserContext();
  const { cafeId, amount, pointId } = route.params;
  const [pin, setPin] = useState("");

  const onCollect = async () => {
    try {
      await api.post("/student/point/collect", {
        matricNo: user.id,
        cafeId: cafeId,
        amount: amount,
        pointId: pointId,
        otp: pin,
      });

      socket.emit("student:get-point-total", { matricNo: user?.id });
      socket.emit("admin:get-overall");

      setPin("");
      // Push notification
      popupMessage({
        title: "Success",
        message: "You have collected point!",
      });
      navigation.navigate("Dashboard");
    } catch (e) {
      setPin("");
      popupMessage({ title: "Alert", message: e.response.data?.message });
      console.log(e);
    }
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
        <Input label={"Insert PIN code here"} onChange={setPin} value={pin} />
        <View style={{ marginTop: 30 }}>
          <Button label={"Collect"} onPress={onCollect} />
        </View>
      </View>
    </View>
  );
};

export default InsertPin;
