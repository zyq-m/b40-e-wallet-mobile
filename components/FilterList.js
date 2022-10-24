import { View, Image, Text, TouchableOpacity, Platform } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
// import html2pdf from "html2pdf.js"; // comment this out before compile to android

import Button from "./Button";
import FilterItem from "./FilterItem";
import DocumentTemplate from "./DocumentTemplate";
import { useUserContext } from "../hooks";

import filterStyle from "../styles/filterStyle";

const FilterList = ({ onCollapse, list, onList, document }) => {
  const { user } = useUserContext();

  const generatePDF = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try {
      if (Platform.OS === "web") {
        // html2pdf()
        //   .from(DocumentTemplate(document), "string")
        //   .save("trasaction-history"); // comment this out before compile to android
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

  return (
    <TouchableOpacity
      activeOpacity={0}
      style={filterStyle.fitlerBackDrop}
      onPress={onCollapse}>
      <View style={filterStyle.filterContainer}>
        <View style={[filterStyle.filterRow, { paddingTop: 10 }]}>
          <MCIcon name="close" size={24} onPress={onCollapse} />
          <Text style={filterStyle.filterHeader}>Sort by</Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 32 }}>
          {list.map(({ id, label, checked }) => (
            <FilterItem
              key={id}
              label={label}
              active={checked}
              onActive={() => onList(id)}
            />
          ))}
        </View>
        {!user.student && (
          <View style={{ marginBottom: 20 }}>
            <Button label={"Print"} onPress={generatePDF} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FilterList;
