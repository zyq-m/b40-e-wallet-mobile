import React, { useState, useEffect } from "react";
import { View, Image, Platform, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Button } from "../components";
import { setTransactions } from "../lib/API";
import { ws } from "../lib/Socket";
import { useUserContext } from "../hooks";
import { checkURL } from "../utils/checkURL";
import { popupMessage } from "../utils/popupMessage";

import { globals, QRScanStyle } from "../styles";

const QRScan = ({ navigation, route }) => {
  const { amount } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { user } = useUserContext();

  const handlePermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
    }
  };

  const navigate = () => {
    setScanned(true);
    navigation.navigate("Home");
  };

  const handleQRScan = async ({ data }) => {
    const cafeId = checkURL(data);
    const bodyData = {
      sender: user.id,
      amount: amount,
    };

    if (cafeId) {
      setTransactions({ id: cafeId, data: bodyData })
        .then(() => {
          popupMessage({ title: "Success", message: "Payment successful👍" });
        })
        .then(() => {
          ws.emit("get_student", user.id);
          ws.emit("get_transaction_student", user.id);
          ws.emit("get_transaction_cafe", cafeId);

          navigate();
        })
        .catch(() => {
          popupMessage({
            title: "Error",
            message: "There a problem. Please try again later",
          });
        });
    } else {
      popupMessage({
        title: "Error",
        message: "Invalid QR code. Please scan again.",
      });
    }

    setScanned(true);
  };

  useEffect(() => {
    handlePermission();
  }, []);

  return (
    <View style={[globals.container, { paddingHorizontal: 16 }]}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleQRScan}
        style={QRScanStyle.barcode}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={QRScanStyle.scanner}>
          <View style={QRScanStyle.row}>
            <Image
              style={[QRScanStyle.square]}
              source={require("../assets/icons/scanner-icon.png")}
            />
            <Image
              style={[
                QRScanStyle.square,
                { transform: [{ rotateY: "180deg" }] },
              ]}
              source={require("../assets/icons/scanner-icon.png")}
            />
          </View>
          <View style={QRScanStyle.row}>
            <Image
              style={[
                QRScanStyle.square,
                { transform: [{ rotateX: "180deg" }] },
              ]}
              source={require("../assets/icons/scanner-icon.png")}
            />
            <Image
              style={[
                QRScanStyle.square,
                { transform: [{ rotate: "-180deg" }] },
              ]}
              source={require("../assets/icons/scanner-icon.png")}
            />
          </View>
        </View>
      </View>
      <View style={{ paddingBottom: 24 }}>
        <Button label={"Scan again"} onPress={() => setScanned(false)} />
      </View>
    </View>
  );
};

export default QRScan;
