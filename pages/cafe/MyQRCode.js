import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-qr-code";

import { api } from "../../services/axiosInstance";
import { useUserContext } from "../../hooks";
import { globals } from "../../styles";

const MyQRCode = ({ route }) => {
  const { user } = useUserContext();
  const [qr, setQr] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { loyalty, amount } = route.params;

  useEffect(() => {
    const controller = new AbortController();
    api
      .get(`/cafe/qr/${loyalty ? "loyalty" : "ekupon"}/${user.id}`, {
        signal: controller.signal,
      })
      .then((res) =>
        setQr({
          url: `${res.data.data.url}&&amount=${amount}`,
          name: res.data.data.name,
        })
      )
      .then(() => setLoading(false))
      .catch((err) => console.error(err));

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontWeight: "500",
            color: "rgba(132, 132, 132, 1)",
          }}
        >
          Loading..
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        globals.container,
        {
          paddingHorizontal: 16,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      {qr && (
        <>
          <View style={QRStyles.QRWrapper}>
            <QRCode
              size={300}
              value={qr?.url}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          </View>
          <Text style={QRStyles.cafeName}>{qr?.name}</Text>
        </>
      )}
    </View>
  );
};

export default MyQRCode;

const QRStyles = StyleSheet.create({
  QRWrapper: {
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 9,
    borderColor: "rgba(0, 0, 0, 0.08)",
  },
  cafeName: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "600",
  },
});
