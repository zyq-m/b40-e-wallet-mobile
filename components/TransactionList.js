import { memo } from "react";

import TransactionItem from "./TransactionItem";
import toMYR from "../utils/toMYR";
import dayjs from "dayjs";

const TransactionList = ({ data, user, navigation, style, border, params }) => {
	return (
		<>
			{data?.map((data, i) => {
				let details = {
					sender: `${data?.student?.name || data?.staff?.name} - ${
						data?.student?.matric_no || data?.staff?.email
					}`,
					recipient: data.cafe.cafe_name,
					transactionId: data.id,
					amount: toMYR(data.amount),
					date: dayjs(data.timestamp).format("DD/MM/YYYY hh:mm"),
				};

				return (
					<TransactionItem
						key={i}
						transactionId={data.id}
						field1={data?.student?.matric_no || data?.staff?.email}
						approved={data.transaction?.approved}
						time={dayjs(data.timestamp).format("hh:mm")}
						date={dayjs(data.timestamp).format("DD/MM/YYYY")}
						amount={toMYR(data.amount)}
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
