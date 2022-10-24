import React from "react";
import { Text, View, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FA from "react-native-vector-icons/FontAwesome";

const Profile = ({ textField1, textField2, onLogout }) => {
  return (
    <View style={[profileStyle.profileContainer, profileStyle.bgWhite]}>
      <View>
        <FA name="user-circle" size={58} color="rgba(88, 83, 76, 1)" />
      </View>
      <View style={{ flex: 1, marginLeft: 6 }}>
        <Text style={profileStyle.profileHeader}>{textField1}</Text>
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
