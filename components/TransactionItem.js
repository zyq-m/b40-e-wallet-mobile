import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import CheckBox from "expo-checkbox";
import instanceAxios from "../lib/instanceAxios";

const TransactionItem = ({
  navigate,
  noBorder,
  field1,
  time,
  date,
  amount,
  cafe,
  approved,
  transactionId,
}) => {
  const [checked, setChecked] = useState(approved);

  const updateChecked = () => {
    instanceAxios
      .put("/api/transactions/approved", {
        transactionId: transactionId,
        value: !checked,
      })
      .then(() => setChecked(!checked));
  };

  const handleCheck = () => {
    if (!checked) {
      console.log("1");
      updateChecked();
    } else {
      if (Platform.OS === "web") {
        alert("Are you sure want?");
        return updateChecked();
      }

      Alert.alert("Important", "Are you sure?", [
        { text: "Cancel", onPress: () => false },
        { text: "Ok", onPress: () => updateChecked() },
      ]);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={navigate}
      style={[
        transactionItemStyle.transactionItem,
        noBorder ? "" : transactionItemStyle.transactionItemBorder,
      ]}>
      <View style={{ paddingLeft: 20 }}>
        <Text style={{ fontWeight: "500" }}>{field1}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={transactionItemStyle.transactionSmallTxt}>{time}</Text>
          <Text
            style={[
              transactionItemStyle.transactionSmallTxt,
              { marginLeft: 12 },
            ]}>
            {date}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Text
          style={[
            transactionItemStyle.transactionAmount,
            !cafe && { paddingRight: 20, paddingVertical: 16 },
          ]}>
          {cafe ? "+" : "-"}RM{amount}
        </Text>
        {cafe && (
          <TransactionCheckBox handleCheck={handleCheck} checked={checked} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const TransactionCheckBox = ({ handleCheck, checked }) => {
  if (Platform.OS === "web") {
    return (
      <TouchableOpacity activeOpacity={1} style={transactionItemStyle.checkBox}>
        <CheckBox
          value={checked}
          style={{ padding: 9 }}
          onValueChange={handleCheck}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleCheck}
        style={transactionItemStyle.checkBox}>
        <CheckBox
          value={checked}
          style={{ padding: 9 }}
          onValueChange={handleCheck}
        />
      </TouchableOpacity>
    );
  }
};

const transactionItemStyle = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  transactionItemBorder: {
    borderTopColor: "rgba(0, 0, 0, 0.11)",
    borderTopWidth: 1,
  },
  transactionSmallTxt: {
    fontSize: 9,
    color: "rgba(0, 0, 0, 0.47)",
  },
  transactionAmount: {
    fontSize: 12,
    fontWeight: "600",
  },
  checkBox: {
    paddingVertical: 16,
    paddingRight: 20,
    paddingLeft: 12,
  },
});

export default TransactionItem;
