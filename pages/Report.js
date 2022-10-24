import { View, Text, StyleSheet, ScrollView } from "react-native";

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
