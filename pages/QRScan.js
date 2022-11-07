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

  const handleQRScan = async ({ data }) => {
    const cafeId = checkURL(data);

    if (cafeId) {
      ws.emit("pay", cafeId, user.id, amount);

      // ! mcm pelik
      ws.on("pay_detail", () => {
        ws.emit("get_student", user.id);
        ws.emit("get_transaction_student", user.id);
        ws.emit("get_transaction_cafe", cafeId);
        // TODO: set event to push notification
        ws.emit("send_notification", cafeId, {
          title: "Payment recieved",
          body: `You recieved RM${amount}.00 from ${user.id}`,
        });
        ws.emit("send_notification", user.id, {
          title: "Payment sent",
          body: `You spent RM${amount}.00 at ${cafeId}`,
        });

        popupMessage({ title: "Success", message: "Payment successful👍" });
        navigation.navigate("Dashboard");

        // remove socket to avoid looping ascendingly
        ws.removeAllListeners("pay_detail");
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
