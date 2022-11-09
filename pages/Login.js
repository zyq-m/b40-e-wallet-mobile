import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

import { login } from "../lib/API";
import { ws } from "../lib/Socket";

import { Button, Input } from "../components";

import { globals, loginStyle } from "../styles";
import { getValueFor } from "../utils/SecureStore";
import { popupMessage } from "../utils/popupMessage";
import { useUserContext } from "../hooks";

const Login = ({ navigation }) => {
  const [cafeOwner, setCafeOwner] = useState(false);
  const [studentAcc, setStudentAcc] = useState("");
  const [cafeAcc, setCafeAcc] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserContext();

  const authUser = ({ id, student }) => {
    setUser(prev => ({
      ...prev,
      id: id,
      login: true,
      student: student || false,
    }));
  };

  const onSubmit = () => {
    if (cafeOwner) {
      ws.emit("new_user", cafeAcc);
    } else {
      ws.emit("new_user", studentAcc);
    }

    ws.on("login_error", async error => {
      if (error) {
        popupMessage({
          title: "Cannot login",
          message: "You only can login to 1 device",
        });
        return ws.removeAllListeners("login_error");
      }

      if (cafeOwner) {
        await login(
          "cafe",
          { username: cafeAcc, password: password },
          "Invalid username or password"
        );
        authUser({ id: cafeAcc });
      } else {
        await login(
          "students",
          { matric_no: studentAcc, password: password },
          "Invalid matric no or password"
        );
        authUser({ id: studentAcc, student: true });
      }

      navigation.navigate("Home", { screen: "Dashboard" });
      ws.removeAllListeners("login_error");
    });
  };

  useEffect(() => {
    // trigger sockect to update when page refresh
    getValueFor("id")
      .then(id => ws.emit("connected", id))
      .catch(() => {
        return;
      });
    return () => {
      ws.removeAllListeners();
    };
  }, [ws]);

  return (
    <View
      style={[
        globals.container,
        { justifyContent: "center", paddingHorizontal: 16 },
      ]}>
      <View>
        <Image
          style={loginStyle.logo}
          source={require("../assets/logo-unisza.png")}
        />
        <Text style={loginStyle.loginHeader}>Welcome Back</Text>
        {cafeOwner ? (
          <Input label={"Username |"} value={cafeAcc} onChange={setCafeAcc} />
        ) : (
          <Input
            label={"Matric No. |"}
            value={studentAcc}
            onChange={setStudentAcc}
          />
        )}
        <Input
          label={"Password |"}
          secure={true}
          value={password}
          onChange={setPassword}
        />
        <View style={{ marginTop: 37 }}>
          <Button label={"Login"} onPress={onSubmit} />
        </View>
        <Text
          style={loginStyle.smallText}
          onPress={() => setCafeOwner(!cafeOwner)}>
          {cafeOwner ? "Are you a student?" : "Are you a cafe owner?"}
        </Text>
      </View>
    </View>
  );
};

export default Login;
