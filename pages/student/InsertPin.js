import React from "react";
import { View, Text, Image } from "react-native";
import { Button, Input } from "../../components";
import { globals, insertPinStyle } from "../../styles";

const InsertPin = ({ navigation }) => {
  const toDashboard = () => {
    // You can add your authentication logic here
    // If authentication is successful, navigate to the "Dashboard" screen
    navigation.navigate("Dashboard"); // Replace "Dashboard" with your route name
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
        <Input label={"Insert PIN code here"} />
        <View style={{ marginTop: 30 }}>
          <Button label={"Send"} onPress={toDashboard} />
        </View>
      </View>
    </View>
  );
};

export default InsertPin;
