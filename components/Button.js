import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ label, onPress, disable }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disable}>
      <Text style={buttonStyle.button}>{label}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = StyleSheet.create({
  button: {
    paddingVertical: 12,
    textAlign: "center",
    fontWeight: "600",
    backgroundColor: "#FFD400",
    borderRadius: 9,
  },
});

export default Button;
