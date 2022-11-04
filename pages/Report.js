import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from "react-native";

import instanceAxios from "../lib/instanceAxios";
import { useUserContext } from "../hooks";
import { Button } from "../components";

import { globals, loginStyle } from "../styles";

const Report = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useUserContext();

  const handleSend = () => {
    if (title !== "") {
      instanceAxios
        .post("/api/feedback", { id: user.id, title: title, description: desc })
        .then(() => {
          if (Platform.OS === "web") {
            alert("Thank you for your feedback");
          } else {
            Alert.alert("Success", "Thank you for your feedback");
          }
          navigation.navigate("Dashboard");
        })
        .then(() => {
          setTitle("");
          setDesc("");
        })
        .catch(() => {
          if (Platform.OS === "web") {
            alert("Please try again");
          } else {
            Alert.alert("Request timeout", "Please try again");
          }
        });
    } else {
      if (Platform.OS === "web") {
        alert("Please describe your feedback");
      } else {
        Alert.alert("Important", "Please describe your feedback");
      }
    }
  };

  return (
    <View style={globals.container}>
      <View style={{ padding: 16 }}>
        <Para>Title</Para>
        <Input
          value={title}
          onChangeText={setTitle}
          placeholder="I want new feature"
        />
        <Para>Descrption</Para>
        <Input
          value={desc}
          onChangeText={setDesc}
          multiline
          numberOfLines={4}
        />
        <Button label={"Send"} onPress={handleSend} />
      </View>
    </View>
  );
};

const Para = ({ children, style }) => {
  return <Text style={[aboutStyle.para, style]}>{children}</Text>;
};

const Input = props => {
  return (
    <TextInput
      {...props}
      style={[loginStyle.inputContainer, aboutStyle.form]}
    />
  );
};

const aboutStyle = StyleSheet.create({
  para: {
    marginBottom: 6,
  },
  form: {
    marginTop: 0,
    marginBottom: 24,
  },
});

export default Report;
