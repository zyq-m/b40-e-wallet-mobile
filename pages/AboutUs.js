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
        <Image
          style={{ width: "100%", height: 200 }}
          source={require("../assets/company-icon.png")}
        />
        <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          <CardWrap />
          <Para
            style={{
              paddingTop: 8,
              textAlign: "center",
              fontStyle: "italic",
            }}>
            "Bayar Dengan Mudah"
          </Para>
          <Header>Latar belakang syarikat</Header>
          <Para>
            Syarikat Giga JS merupakan sebuah syarikat yang ditubuhkan oleh tiga
            orang rakan kongsi. Penubuhan syarikat ini adalah bertujuan untuk
            memudahkan urusan transaksi pelanggan di kedai-kedai makan secara
            'cashless'.
          </Para>
          <Header>Misi & Visi</Header>
          <Para>
            Menghasilkan aplikasi kupon makanan yang mudah serta mesra pengguna
            bagi melancarkan urusan transaksi di kedai-kedai makan.
          </Para>
          <Para>
            Aplikasi yang dihasilkan dapat menepati kehendak pengguna untuk
            membeli makanan dan minuman di kedai makan secara mudah, pantas, dan
            selamat secara 'cashless'.
          </Para>
          <Header>Maklumat produk/perkhidmatan</Header>
          <Para>
            Kupon makanan dalam bentuk mata wang digital yang boleh digunakan
            untuk urusan transaksi di kedai-kedai makan tanpa menggunakan wang
            tunai.
          </Para>
          <Header>Dasar privasi</Header>
          <Para>
            Giga JS memberi jaminan bahawa aplikasi kami memberi servis kualiti
            yang terbaik. Kami mengamalkan nilai-nilai murni dalam menghasilkan
            aplikasi kami dan mengekalkan prestasi yang berkualiti tinggi
            berdasarkan keperluan undang-undang antarabangsa dan tempatan.
          </Para>
          <ContactUs />
        </View>
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

const CardWrap = () => {
  return (
    <>
      <Header style={{ textAlign: "center" }}>Ahli Kumpulan</Header>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 16,
        }}>
        <Card img={require("../assets/team-pic/nabil.jpg")} name={"nabil"} />
        <Card img={require("../assets/team-pic/haziq.jpg")} name={"haziq"} />
        <Card img={require("../assets/team-pic/nabil.jpg")} name={"fauzan"} />
      </View>
    </>
  );
};

const Card = ({ img, name }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={{ width: 70, height: 70, borderRadius: 999 }}
        source={img}
      />
      <Text style={{ textTransform: "capitalize", marginTop: 4, fontSize: 13 }}>
        {name}
      </Text>
    </View>
  );
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
