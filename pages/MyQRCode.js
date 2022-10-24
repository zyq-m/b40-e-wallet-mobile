import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-qr-code";

import instanceAxios from "../lib/instanceAxios";
import { useUserContext } from "../hooks";
import { globals } from "../styles";

const MyQRCode = () => {
  const { user } = useUserContext();
  const [cafeName, setCafeName] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    instanceAxios
      .get(`/api/cafe/${user.id}`, {
        signal: controller.signal,
      })
      .then(name => setCafeName(name.data[0].cafe_name))
      .then(() => setLoading(false))
      .catch(err => console.error(err));
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
          }}>
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
      ]}>
      {cafeName && (
        <>
          <View style={QRStyles.QRWrapper}>
            <QRCode
              size={300}
              value={`https://e-voucher-api.herokuapp.com/api/${user.id}`}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          </View>
          <Text style={QRStyles.cafeName}>{cafeName}</Text>
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
