import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

import { globals, loginStyle } from "../../styles";
import { Button } from "../../components";
import { getProfile, updateProfile } from "../../lib/API";
import { useUserContext } from "../../hooks";
import { popupMessage } from "../../utils/popupMessage";

const Profile = () => {
  const [profile, setProfile] = useState({ bank: "", accountNo: "" });
  const { user } = useUserContext();

  const onUpdateProfile = () => {
    updateProfile(user.id, profile)
      .then(() => {
        popupMessage({
          title: "Success",
          message: "Profile successfully updated",
        });
      })
      .catch((err) => {
        if (err.response.status == 400) {
          popupMessage({
            title: "Alert",
            message: 'Please fill in your "Bank Name" and "Account No"',
          });
        }

        if (err.response.status == 500) {
          popupMessage({
            title: "Alert",
            message: "Your profile cannot update due to server error",
          });
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();

    getProfile(user.id, controller.signal)
      .then((details) => {
        setProfile((prev) => ({
          ...prev,
          bank: details.data.bank || "",
          accountNo: details.data.accountNo || "",
        }));
      })
      .catch((err) => err);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <View style={globals.container}>
      <View style={{ padding: 16 }}>
        <Para>Bank Name</Para>
        <Input
          value={profile.bank}
          onChangeText={(e) => setProfile((prev) => ({ ...prev, bank: e }))}
        />
        <Para>Account No.</Para>
        <Input
          value={profile.accountNo}
          onChangeText={(e) =>
            setProfile((prev) => ({ ...prev, accountNo: e }))
          }
        />
        <Button label={"Update"} onPress={onUpdateProfile} />
      </View>
    </View>
  );
};

const Para = ({ children, style }) => {
  return <Text style={[aboutStyle.para, style]}>{children}</Text>;
};

const Input = (props) => {
  return (
    <TextInput
      {...props}
      style={[loginStyle.inputContainer, aboutStyle.form]}
    />
  );
};

const aboutStyle = StyleSheet.create({
  para: {
    marginLeft: 6,
    marginBottom: 6,
  },
  form: {
    marginTop: 0,
    marginBottom: 24,
  },
});

export default Profile;
