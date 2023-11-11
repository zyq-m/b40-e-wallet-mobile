import { memo } from "react";
import { formatTime, formatDate } from "../utils/formatTime";

import TransactionItem from "./TransactionItem";

const TransactionList = ({ data, user, navigation, style, border }) => {
  return (
    <>
      {data?.map((data, i) => {
        let details = {
          sender: `${data.matricNo} - ${data.matricNo}`,
          recipient: data.cafe.name,
          transactionId: data.id,
          amount: `RM${data.amount}`,
          date: `${formatDate(data.created_at)} at ${formatTime(
            data.created_at
          )}`,
        };

        return (
          <TransactionItem
            key={i}
            transactionId={data.id}
            field1={data.matricNo}
            approved={data.walletTransaction.approved}
            time={formatTime(data.created_at)}
            date={formatDate(data.created_at)}
            amount={data.amount}
            cafe={user?.role === "CAFE"}
            noBorder={!border && i == 0}
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
