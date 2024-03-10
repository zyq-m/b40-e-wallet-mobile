import { useState, useEffect } from "react";
import { Text, View, Platform } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { Refresh, FilterList, TransactionList } from "../components";
import { useUserContext, useTransaction } from "../hooks";

import { globals, transactionStyle } from "../styles";

const Transaction = ({ navigation, route }) => {
  const [collapse, setCollapse] = useState(false);
  const { user } = useUserContext();
  const onCollapse = () => setCollapse((prev) => !prev);
  const { transactions, list, onList } = useTransaction(route.params);

  useEffect(() => {
    let subscribe = true;
    const header = async () => {
      if (subscribe) {
        navigation.setOptions({
          headerRight: () => (
            <View style={transactionStyle.row}>
              <MaterialIcon
                name="filter-list"
                size={25}
                onPress={onCollapse}
                style={Platform.OS === "web" && { marginRight: 11 }}
              />
            </View>
          ),
        });
      }
    };

    header();

    return () => {
      subscribe = false;
    };
  }, []);

  return (
    <View style={[globals.container, {}]}>
      <Refresh transaction={true} style={{ paddingBottom: 24 }}>
        <TransactionList
          data={transactions.data}
          navigation={navigation}
          user={user}
          border={true}
          params={route.params}
          style={transactionStyle.transactionItemWrap}
        />
      </Refresh>
      {!transactions.data.length ? (
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "500",
            color: "rgba(132, 132, 132, 1)",
          }}
        >
          No transactions history
        </Text>
      ) : (
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 12,
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.08)",
            backgroundColor: "#FFF",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: "rgba(0, 0, 0, 0.47)",
              }}
            >
              Total:
            </Text>
            <Text style={{ fontWeight: "500" }}>
              {route.params?.loyalty
                ? `${transactions.summary._sum.amount}pt`
                : `RM${transactions.summary._sum.amount}`}
            </Text>
          </View>
        </View>
      )}
      {collapse && (
        <FilterList
          onCollapse={onCollapse}
          list={list}
          onList={onList}
          // document={filterTransaction}
        />
      )}
    </View>
  );
};

export default Transaction;
