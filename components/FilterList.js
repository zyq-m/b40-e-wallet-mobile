import { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "./Button";
import FilterItem from "./FilterItem";
import DocumentTemplate from "./DocumentTemplate";
import { useUserContext } from "../hooks";

import filterStyle from "../styles/filterStyle";
import { loginStyle } from "../styles";
import { api } from "../services/axiosInstance";

const FilterList = ({
  onCollapse,
  list,
  onList,
  document,
  customDate,
  loyalty,
}) => {
  const { user } = useUserContext();
  const [date, setDate] = useState({ from: "", to: "" });

  const generatePDF = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      if (Platform.OS === "web") {
        alert("Generating PDF feature still in development");
      } else {
        const { uri } = await printToFileAsync({
          html: DocumentTemplate(document),
        });
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  function apiURL() {
    if (loyalty) {
      return `/student/transaction/point/${date?.from}/${date?.to}/${user.id}`;
    }
    if (user.role === "CAFE") {
      return `/cafe/transaction/${date.from}/${date.to}/${user.id}`;
    }
    if (user.role !== "CAFE") {
      return `/student/transaction/wallet/${date?.from}/${date?.to}/${user.id}`;
    }
  }

  async function onFind() {
    try {
      const transaction = await api.get(apiURL());

      customDate(transaction.data);
    } catch (error) {
      customDate({ data: [] });
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0}
      style={filterStyle.fitlerBackDrop}
      // onPress={onCollapse}
    >
      <View style={filterStyle.filterContainer}>
        <View style={[filterStyle.filterRow, { paddingTop: 10 }]}>
          <MCIcon name="close" size={24} onPress={onCollapse} />
          <Text style={filterStyle.filterHeader}>Sort by</Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 32 }}>
          {list?.map(({ id, label, checked }) => (
            <FilterItem
              key={id}
              label={label}
              active={checked}
              onActive={() => onList(id)}
            />
          ))}

          <View style={{ flexDirection: "row", marginBottom: 14, gap: 14 }}>
            <View style={loginStyle.inputContainer}>
              <Text style={loginStyle.inputLabel}>From</Text>
              <input
                type="date"
                style={{
                  flex: 1,
                  marginLeft: 4,
                  border: "unset",
                  outline: "none",
                }}
                onChange={(e) => {
                  setDate((prev) => ({ ...prev, from: e.target.value }));
                }}
              />
            </View>
            <View style={loginStyle.inputContainer}>
              <Text style={loginStyle.inputLabel}>To</Text>
              <input
                type="date"
                style={{
                  flex: 1,
                  marginLeft: 4,
                  border: "unset",
                  outline: "none",
                }}
                onChange={(e) => {
                  setDate((prev) => ({ ...prev, to: e.target.value }));
                }}
              />
            </View>
          </View>
          <Button label="Find" onPress={onFind} />
        </View>
        {/* {user.role === "CAFE" && (
          <View style={{ marginBottom: 20 }}>
            <Button label={"Print"} onPress={generatePDF} />
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

export default FilterList;
