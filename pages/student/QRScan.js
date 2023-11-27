import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Button } from "../../components";
import { useUserContext } from "../../hooks";
import { checkURL } from "../../utils/checkURL";
import { popupMessage } from "../../utils/popupMessage";
import { pay, collectPoint } from "../../api/student/studentApi";

import { QRScanStyle } from "../../styles";
import { socket } from "../../services/socket";

const QRScan = ({ navigation, route }) => {
  const { loyalty } = route.params;
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
    setScanned(true);
    function getUrlParams(url) {
      let params = {};
      let parts = url.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
          params[key] = value;
        }
      );
      return params;
    }

    const params = getUrlParams(data);
    try {
      if (loyalty) {
        // Collect point
        await collectPoint(
          user.id,
          params.id,
          params.amount,
          params.pointId,
          params.otp
        );
        popupMessage({
          title: "Success",
          message: "Point collected successful👍",
        });
        socket.emit("student:get-point-total", { matricNo: user?.id });
      } else {
        // Pay
        await pay(user.id, params.id, params.amount);
        popupMessage({ title: "Success", message: "Payment successful👍" });
        // send notification to cafe
        socket.emit("student:get-wallet-total", { matricNo: user?.id });
        socket.emit("notification:send", {
          receiver: id,
          message: {
            title: "Payment recieved",
            body: `You recieved RM${params.amount} from ${user.id}`,
          },
        });
        // notify self
        socket.emit("notification:send", {
          receiver: user.id,
          message: {
            title: "Payment sent",
            body: `You spent RM${params.amount} at ${params.name}`,
          },
        });
      }
      socket.emit("admin:get-overall");
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log(error);
      popupMessage({ title: "Error", message: error.response.data?.message });
    }
  };

  useEffect(() => {
    handlePermission();
  }, []);

  return (
    <View style={[{ flex: 1, paddingHorizontal: 16, backgroundColor: "#000" }]}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleQRScan}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={QRScanStyle.scanner}>
          <View style={QRScanStyle.row}>
            <Image
              style={[QRScanStyle.square]}
              source={require("../../assets/icons/scanner-icon.png")}
            />
            <Image
              style={[
                QRScanStyle.square,
                { transform: [{ rotateY: "180deg" }] },
              ]}
              source={require("../../assets/icons/scanner-icon.png")}
            />
          </View>
          <View style={QRScanStyle.row}>
            <Image
              style={[
                QRScanStyle.square,
                { transform: [{ rotateX: "180deg" }] },
              ]}
              source={require("../../assets/icons/scanner-icon.png")}
            />
            <Image
              style={[
                QRScanStyle.square,
                { transform: [{ rotate: "-180deg" }] },
              ]}
              source={require("../../assets/icons/scanner-icon.png")}
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
