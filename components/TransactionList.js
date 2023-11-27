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
          amount: `RM${data.amount}`,
          date: `${formatDate(data.transaction.createdAt)} at ${formatTime(
            data.transaction.createdOn
          )}`,
        };

        return (
          <TransactionItem
            key={i}
            transactionId={data.transaction.id}
            field1={data.transaction.matricNo}
            approved={data.transaction?.approved}
            time={formatTime(data.transaction.createdOn)}
            date={formatDate(data.transaction.createdAt)}
            amount={data.amount}
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
