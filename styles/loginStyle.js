import { StyleSheet } from "react-native";

const loginStyle = StyleSheet.create({
  loginHeader: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  logo: {
    width: 212,
    height: 99,
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.11)",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  inputLabel: {
    fontSize: 12,
    color: "rgba(160, 160, 160, 1)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  smallText: {
    marginTop: 21,
    color: "rgba(0, 0, 0, 0.62)",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default loginStyle;
