import { View, Image, Text, TouchableOpacity } from "react-native";
import filterStyle from "../styles/filterStyle";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

const FilterItem = ({ label, active, onActive }) => {
  return (
    <TouchableOpacity onPress={onActive} activeOpacity={1}>
      <View
        style={[
          filterStyle.filterRow,
          filterStyle.filterItemSpace,
          { justifyContent: "space-between" },
        ]}>
        <View style={[filterStyle.filterRow]}>
          <MCIcon name="calendar-text-outline" size={24} />
          <Text style={filterStyle.filterItemTxt}>{label}</Text>
        </View>

        {active && <IonIcon name="checkmark" size={22} />}
      </View>
    </TouchableOpacity>
  );
};

export default FilterItem;
