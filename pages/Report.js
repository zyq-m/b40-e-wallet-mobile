import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import React, { useCallback } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { globals } from "../styles";

const AboutUs = () => {
  return (
    <View style={globals.container}>
      <ScrollView>
        <Para>Report bug</Para>
      </ScrollView>
    </View>
  );
};

const ContactUs = () => {
  const handleURL = url =>
    useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }, [url]);

  return (
    <>
      <Header>Hubungi kami:</Header>
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        <Icon
          name="email"
          size={24}
          style={{ marginRight: 8 }}
          onPress={handleURL("mailto:haziq.musa02@gmail.com")}
        />
        <Icon
          name="phone"
          size={24}
          style={{ marginRight: 8 }}
          onPress={handleURL("tel:0132733528")}
        />
        <Icon
          name="twitter"
          size={24}
          onPress={handleURL("https://twitter.com/zyq__m")}
        />
      </View>
    </>
  );
};

const Para = ({ children, style }) => {
  return <Text style={[aboutStyle.para, style]}>{children}</Text>;
};

const Header = ({ children, style }) => {
  return <Text style={[aboutStyle.header, style]}>{children}</Text>;
};

const aboutStyle = StyleSheet.create({
  para: {
    marginTop: 16,
  },
  header: {
    marginTop: 24,
    fontWeight: "700",
  },
});

export default AboutUs;
