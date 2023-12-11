import { useState, useEffect } from "react";
import { Text, View } from "react-native";

import { useUserContext } from "../../hooks";

import { globals } from "../../styles";
import { api } from "../../services/axiosInstance";

const MyPin = () => {
  const [pin, setPin] = useState({ pin: "------" });
  const { user } = useUserContext();

  const fetchPin = () => {
    api
      .get(`/cafe/one-time/${user.id}`)
      .then((res) => {
        setPin((prev) => ({
          ...prev,
          pin: res.data.data.otp,
          remaining: +res.data.data.remaining,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (pin?.remaining > 0) {
      const timer = setTimeout(() => {
        setPin((prev) => ({ ...prev, remaining: prev.remaining - 1 }));
      }, 1000);
      if (pin?.remaining <= 10) {
        setPin((prev) => ({ ...prev, style: "rgb(255 88 88)" }));
      } else {
        setPin((prev) => ({ ...prev, style: "" }));
      }

      return () => clearTimeout(timer);
    } else {
      setPin((prev) => ({ ...prev, pin: "------" }));
      fetchPin();
    }
  }, [pin?.remaining]);

  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "700",
            marginBottom: 12,
            color: pin?.style ? pin.style : "rgb(88, 83, 76)",
          }}
        >
          {pin.pin}
        </Text>
        <Text style={{ color: "rgba(121, 121, 121, 1)" }}>
          This pin will renew in {pin.remaining} seconds
        </Text>
      </View>
    </View>
  );
};

export default MyPin;
