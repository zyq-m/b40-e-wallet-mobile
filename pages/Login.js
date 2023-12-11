import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import { login } from "../api/auth/auth";

import { Button, Input } from "../components";

import { globals, loginStyle } from "../styles";
import { popupMessage } from "../utils/popupMessage";
import { useUserContext } from "../hooks";
import { storeObject } from "../utils/asyncStorage";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const onSubmit = async () => {
    try {
      const user = await login(id, password);
      // Update context
      const details = {
        id: id,
        isSignedIn: true,
        role: user,
      };
      setUser(details);
      storeObject("userDetails", details);
    } catch (error) {
      // Look for status code & message
      console.log(error);
      popupMessage({
        title: "Cannot login",
        message: "Invalid userId or password",
      });
    }
  };

  return (
    <View
      style={[
        globals.container,
        { justifyContent: "center", paddingHorizontal: 16 },
      ]}
    >
      <View>
        <Image
          style={{
            width: 115,
            height: 78,
            alignSelf: "center",
            marginBottom: 8,
          }}
          source={require("../assets/eKupon/logo.png")}
        />
        <Text style={loginStyle.loginHeader}>eKupon@UniSZA</Text>
        <Input label={"Username |"} value={id} onChange={setId} />
        <Input
          label={"Password |"}
          secure={true}
          value={password}
          onChange={setPassword}
        />
        <View style={{ marginTop: 37 }}>
          <Button label={"Login"} onPress={onSubmit} />
        </View>
        <Text style={loginStyle.smallText}>Hi there, welcome back!</Text>
      </View>
    </View>
  );
};

export default Login;
