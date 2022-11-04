import { Alert, Platform } from "react-native";

export const popupMessage = ({ message, title }) => {
  if (Platform.OS === "web") {
    alert(message);
  } else {
    Alert.alert(title, message);
  }
};
