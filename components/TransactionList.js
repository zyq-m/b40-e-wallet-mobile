import { memo } from "react";
import { formatTime, formatDate } from "../utils/formatTime";

import TransactionItem from "./TransactionItem";

const TransactionList = ({ data, user, navigation, style, border, params }) => {
  return (
    <>
      {data?.map((data, i) => {
        let details = {
          sender: `${data.transaction.matricNo} - ${data.transaction.matricNo}`,
          recipient: data.transaction.cafe.name,
          transactionId: data.id,
          amount: `RM${data.transaction.amount}`,
          date: `${formatDate(data.transaction.created_at)} at ${formatTime(
            data.transaction.created_at
          )}`,
        };

        return (
          <TransactionItem
            key={i}
            transactionId={data.transaction.id}
            field1={data.transaction.matricNo}
            approved={data.transaction?.approved}
            time={formatTime(data.transaction.created_at)}
            date={formatDate(data.transaction.created_at)}
            amount={data.transaction.amount}
            role={user?.role}
            noBorder={!border && i == 0}
            params={params}
            navigate={() => {
              navigation.navigate("Transaction Details", {
                data: details,
              });
            }}
            style={style}
          />
        );
      })}
    </>
  );
};

export default memo(TransactionList);
