import { StyleSheet } from "react-native";

const dashboardStyle = StyleSheet.create({
  bgWhite: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  shadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionHeader: {
    marginLeft: 11,
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(132, 132, 132, 1)",
  },
  transactionHeaderWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 11,
    marginBottom: 16,
  },
});

export default dashboardStyle;
