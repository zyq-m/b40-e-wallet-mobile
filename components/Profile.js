import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FA from "react-native-vector-icons/FontAwesome";

import { socket } from "../services/socket";
import { logout } from "../api/auth/auth";
import { useUserContext } from "../hooks";

import { removeAll } from "../utils/asyncStorage";

const Profile = ({ textField1, textField2 }) => {
  const { user, setUser } = useUserContext();
  const onLogout = async () => {
    // You can add your authentication logic here
    // If authentication is successful, navigate to the "Dashboard" screen
    try {
      await logout();
      socket.emit("user:disconnect", { id: user?.id });
      // Remove storage
      await removeAll();
      // Update context
      setUser({});

      // navigation.navigate("Login"); // Replace "Dashboard" with your route name
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[profileStyle.profileContainer, profileStyle.bgWhite]}>
      <View>
        <FA name="user-circle" size={58} color="rgba(88, 83, 76, 1)" />
      </View>
      <View style={{ flex: 1, marginLeft: 6 }}>
        <Text numberOfLines={1} style={profileStyle.profileHeader}>
          {textField1}
        </Text>
        <Text style={profileStyle.profileSub}>{textField2}</Text>
      </View>
      <MaterialIcon name="logout" size={30} onPress={onLogout} />
    </View>
  );
};

const profileStyle = StyleSheet.create({
  bgWhite: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 6,
    alignItems: "center",
    borderRadius: 9,
    borderColor: "rgba(0, 0, 0, 0.11)",
    borderWidth: 1,
  },
  profileImg: {
    width: 58,
    height: 58,
  },
  profileHeader: {
    fontSize: 12,
    fontWeight: "600",
  },
  profileSub: {
    fontSize: 12,
  },
});

export default Profile;
