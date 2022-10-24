import { StyleSheet } from "react-native";

const filterStyle = StyleSheet.create({
  fitlerIcon: {
    width: 29,
    height: 29,
    marginRight: 13,
  },
  fitlerBackDrop: {
    position: "absolute",
    left: 0,
    right: 0,
    // top: 0,
    // bottom: 0,
    // width: "100%",
    height: "100%",
    // flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.33)",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingTop: 13,
    paddingBottom: 0,
    backgroundColor: "#f2f2f2",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  filterHeader: {
    flex: 1,
    fontWeight: "600",
    textAlign: "center",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterItemSpace: {
    marginTop: 16,
  },
  calenderIcon: {
    width: 20,
    height: 20,
  },
  filterItemTxt: {
    marginLeft: 12,
  },
  printIcon: {
    width: 20,
    height: 18,
    marginRight: 12,
  },
});

export default filterStyle;
