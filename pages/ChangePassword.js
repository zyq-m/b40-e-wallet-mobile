import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { useUserContext } from "../hooks";
import { Button } from "../components";
import { popupMessage } from "../utils/popupMessage";

import { globals, loginStyle } from "../styles";
import { changePassword } from "../api/auth/auth";

const ChangePassword = ({ navigation }) => {
  const [credential, setCredential] = useState({
    currPass: "",
    newPass: "",
    rePass: "",
  });
  const { user } = useUserContext();

  const handleSend = async () => {
    const { currPass, newPass, rePass } = credential;

    try {
      await changePassword(user.id, currPass, newPass, rePass);
      // Clear form
      setCredential({ currPass: "", newPass: "", rePass: "" });
      popupMessage({
        message: "Password changed successful",
        title: "Success",
      });

      navigation.navigate("Dashboard");
    } catch (error) {
      console.log(error);
      popupMessage({ message: error.response.data.message, title: "Alert" });
    }
  };

  return (
    <View style={globals.container}>
      <View style={{ padding: 16 }}>
        <Para>Current password</Para>
        <Input
          value={credential.currPass}
          onChangeText={(e) =>
            setCredential((prev) => ({ ...prev, currPass: e }))
          }
        />

        <Para>New Password</Para>
        <Input
          value={credential.newPass}
          onChangeText={(e) =>
            setCredential((prev) => ({ ...prev, newPass: e }))
          }
        />

        <Para>Re-type password</Para>
        <Input
          value={credential.rePass}
          onChangeText={(e) =>
            setCredential((prev) => ({ ...prev, rePass: e }))
          }
        />

        <Button label={"Change"} onPress={handleSend} />
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
      secureTextEntry={true}
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

export default ChangePassword;
