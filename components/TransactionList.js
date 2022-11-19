import { memo } from "react";
import { formatTime, formatDate } from "../utils/formatTime";

import TransactionItem from "./TransactionItem";

const TransactionList = ({ data, user, navigation, style, border, slice }) => {
  if (slice) {
    return (
      <>
        {data
          ?.slice(0, 5)
          .map(
            (
              {
                sender,
                amount,
                created_at,
                created_on,
                transaction_id,
                cafe_name,
                student_name,
                approved_by_recipient,
              },
              i
            ) => {
              let details = {
                sender: `${student_name} - ${sender}`,
                recipient: cafe_name,
                transactionId: transaction_id,
                amount: `RM${amount}`,
                date: `${formatDate(created_on)} at ${formatTime(created_at)}`,
              };

              return (
                <TransactionItem
                  key={i}
                  transactionId={transaction_id}
                  approved={approved_by_recipient}
                  field1={details.sender}
                  time={formatTime(created_at)}
                  date={formatDate(created_on)}
                  amount={amount}
                  noBorder={i == 0 && true}
                  cafe={!user.student}
                  navigate={() => {
                    navigation.navigate("Transaction Details", {
                      data: details,
                    });
                  }}
                />
              );
            }
          )}
      </>
    );
  }

  return (
    <>
      {data?.map(
        (
          {
            sender,
            amount,
            created_at,
            created_on,
            transaction_id,
            cafe_name,
            student_name,
            approved_by_recipient,
          },
          i
        ) => {
          let details = {
            sender: `${student_name} - ${sender}`,
            recipient: cafe_name,
            transactionId: transaction_id,
            amount: `RM${amount}`,
            date: `${formatDate(created_on)} at ${formatTime(created_at)}`,
          };

          return (
            <TransactionItem
              key={i}
              transactionId={transaction_id}
              field1={details.sender}
              approved={approved_by_recipient}
              time={formatTime(created_at)}
              date={formatDate(created_on)}
              amount={amount}
              cafe={!user.student}
              noBorder={!border && i == 0}
              navigate={() => {
                navigation.navigate("Transaction Details", {
                  data: details,
                });
              }}
              style={style}
            />
          );
        }
      )}
    </>
  );
};

export default memo(TransactionList);
