import { useState, useEffect, useMemo, useCallback } from "react";
import { Text, View, Platform } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { Refresh, FilterList, TransactionList } from "../components";

import { useUserContext, useTransaction } from "../hooks";
import { useFilterDate } from "../utils/filterDate";
import { listData } from "../data/constant";

import { globals, transactionStyle } from "../styles";

const Transaction = ({ navigation }) => {
  const [collapse, setCollapse] = useState(false);
  const { user } = useUserContext();
  const { transactions, loading, error } = useTransaction({
    id: user.id,
    student: user.student,
    refresh: user.transaction.refresh,
  });

  const [list, setList] = useState(listData);
  const [filterTransaction, setFilterTransaction] = useState([]);

  const filterDate = useFilterDate();

  const onCollapse = () => setCollapse(prev => !prev);

  const filtered = useMemo(() => filterDate(transactions), [transactions]);

  const onList = id => {
    return setList(prev =>
      prev.map(data => {
        if (data.id === id) {
          return { ...data, checked: true };
        } else {
          return { ...data, checked: false };
        }
      })
    );
  };

  useEffect(() => {
    let subscribe = false;
    const header = async () => {
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
    };

    if (!subscribe) {
      header();
    }

    return () => {
      subscribe = true;
    };
  }, []);

  useEffect(() => {
    list.forEach(({ checked, id }) => {
      if (checked) {
        id === 0 && setFilterTransaction(filtered.getAll);
        id === 1 && setFilterTransaction(filtered.getToday);
        id === 2 && setFilterTransaction(filtered.getWeek);
        id === 3 && setFilterTransaction(filtered.getMonth);
      }
    });
  }, [list, transactions]);

  if (loading) {
    return (
      <>
        <Refresh transaction={true} />
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "500",
            color: "rgba(132, 132, 132, 1)",
          }}>
          {error ? error : "Loading.."}
        </Text>
      </>
    );
  }

  return (
    <View style={[globals.container]}>
      <Refresh transaction={true} style={{ paddingBottom: 24 }}>
        <TransactionList
          data={filterTransaction}
          navigation={navigation}
          user={user}
          border={true}
          style={transactionStyle.transactionItemWrap}
        />
      </Refresh>
      {filterTransaction.length === 0 && (
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "500",
            color: "rgba(132, 132, 132, 1)",
          }}>
          No transactions history
        </Text>
      )}
      {collapse && (
        <FilterList
          onCollapse={onCollapse}
          list={list}
          onList={onList}
          document={filterTransaction}
        />
      )}
    </View>
  );
};

export default Transaction;
