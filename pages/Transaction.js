import { useState, useEffect } from "react";
import { Text, View, Platform } from "react-native";
import moment from "moment";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import { Refresh, TransactionItem, FilterList } from "../components";

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

  const onList = id =>
    setList(prev =>
      prev.map(data => {
        if (data.id == id) {
          return { ...data, checked: true };
        } else {
          return { ...data, checked: false };
        }
      })
    );

  useEffect(() => {
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

    header();
  }, []);

  useEffect(() => {
    list.map(({ checked, id }) => {
      const filtered = filterDate(transactions);
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
      <Refresh transaction={true}>
        <View style={{ paddingBottom: 24 }}>
          {filterTransaction?.map(
            (
              {
                sender,
                amount,
                created_at,
                transaction_id,
                cafe_name,
                student_name,
              },
              i
            ) => {
              let details = {
                sender: `${student_name} (${sender})`,
                recipient: cafe_name,
                transactionId: transaction_id,
                amount: `RM${amount}`,
                date: `${moment(created_at).format("D-MM-YYYY")} at ${moment(
                  created_at
                ).format("h.mma")}`,
              };

              return (
                <View style={transactionStyle.transactionItemWrap} key={i}>
                  <TransactionItem
                    field1={sender}
                    time={moment(created_at).format("h.mma")}
                    date={moment(created_at).format("D-MM")}
                    amount={amount}
                    cafe={!user.student}
                    noBorder={true}
                    navigate={() =>
                      navigation.navigate("Transaction Details", {
                        data: details,
                      })
                    }
                  />
                </View>
              );
            }
          )}
        </View>
      </Refresh>
      {filterTransaction?.length === 0 && (
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
          filterState={state => setFilter(state)}
        />
      )}
    </View>
  );
};

export default Transaction;
