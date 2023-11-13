import { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { Button } from "../../components";
import { useUserContext } from "../../hooks";

import { globals } from "../../styles";
import { api } from "../../services/axiosInstance";

const MyPin = () => {
  const [pin, setPin] = useState({ pin: "", refresh: false });
  const { user } = useUserContext();

  useEffect(() => {
    api
      .get(`/cafe/one-time/${user.id}`)
      .then((res) => {
        setPin((prev) => ({ ...prev, pin: res.data.data.otp }));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [pin.refresh]);

  const onRefresh = () => {
    setPin((prev) => ({ ...prev, refresh: !pin.refresh }));
  };

  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: "rgba(121, 121, 121, 1)",
          }}
        >
          {pin.pin}
        </Text>
      </View>
      <View style={{ paddingBottom: 24 }}>
        <Button label="Refresh" onPress={onRefresh} />
      </View>
    </View>
  );
};

export default MyPin;
