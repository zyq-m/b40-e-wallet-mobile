import { StyleSheet } from "react-native";

const payNowStyle = StyleSheet.create({
  textCenter: {
    textAlign: "center",
  },
  payHeader: {
    marginBottom: 26,
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(121, 121, 121, 1)",
  },
  payAmount: {
    paddingVertical: 34,
    fontSize: 40,
    fontWeight: "700",
    color: "rgba(88, 83, 76, 1)",
  },
  active: {
    color: "white",
    backgroundColor: "rgba(88, 83, 76, 1)",
    borderRadius: 9,
  },
});

export default payNowStyle;
