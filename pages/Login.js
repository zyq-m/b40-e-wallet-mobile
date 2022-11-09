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

  const onSubmit = async () => {
    if (cafeOwner) {
      login("cafe", { username: cafeAcc, password: password })
        .then(() => {
          ws.emit("new_user", cafeAcc);
          authUser({ id: cafeAcc });
        })
        .catch(() => {
          popupMessage({
            title: "Cannot login",
            message: "Invalid username or password",
          });
        });
    } else {
      login("students", { matric_no: studentAcc, password: password })
        .then(() => {
          ws.emit("new_user", studentAcc);
          authUser({ id: studentAcc, student: true });
        })
        .catch(() => {
          popupMessage({
            title: "Cannot login",
            message: "Invalid matric no or password",
          });
        });
    }

    ws.on("login_error", async error => {
      if (error) {
        popupMessage({
          title: "Cannot login",
          message: "You only can login to 1 device",
        });
        return ws.removeAllListeners("login_error");
      }
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
