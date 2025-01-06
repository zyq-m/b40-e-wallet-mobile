import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "./Button";
import FilterItem from "./FilterItem";

import filterStyle from "../styles/filterStyle";
import { loginStyle } from "../styles";
import { api } from "../services/axiosInstance";
import dayjs from "dayjs";

const FilterList = ({ onCollapse, customDate, sendFilter }) => {
	const [date, setDate] = useState({ from: "", to: "" });
	const [list, setList] = useState([
		{
			id: 1,
			label: "Today",
			checked: true,
			date: {
				from: dayjs().format("YYYY-MM-DD"),
				to: dayjs().format("YYYY-MM-DD"),
			},
		},
		{
			id: 2,
			label: "Week",
			checked: false,
			date: {
				from: dayjs().startOf("week").format("YYYY-MM-DD"),
				to: dayjs().endOf("week").format("YYYY-MM-DD"),
			},
		},
		{
			id: 3,
			label: "Month",
			checked: false,
			date: {
				from: dayjs().startOf("month").format("YYYY-MM-DD"),
				to: dayjs().endOf("month").format("YYYY-MM-DD"),
			},
		},
	]);

	function onList(id) {
		setList((prev) =>
			prev.map((li) => {
				if (li.checked) sendFilter(li.date);
				return { ...li, checked: li.id === id };
			})
		);
	}

	async function onFind() {
		sendFilter(date);
	}

	return (
		<TouchableOpacity activeOpacity={0} style={filterStyle.fitlerBackDrop}>
			<View style={filterStyle.filterContainer}>
				<View style={[filterStyle.filterRow, { paddingTop: 10 }]}>
					<MCIcon name="close" size={24} onPress={onCollapse} />
					<Text style={filterStyle.filterHeader}>Sort by</Text>
				</View>
				<View style={{ marginTop: 10, marginBottom: 32 }}>
					{list?.map(({ id, label, checked }) => (
						<FilterItem
							key={id}
							label={label}
							active={checked}
							onActive={() => onList(id)}
						/>
					))}

					<View
						style={{
							flexDirection: "row",
							marginBottom: 14,
							gap: 14,
						}}
					>
						<View style={loginStyle.inputContainer}>
							<Text style={loginStyle.inputLabel}>From</Text>
							<input
								type="date"
								style={{
									flex: 1,
									marginLeft: 4,
									border: "unset",
									outline: "none",
								}}
								onChange={(e) => {
									setDate((prev) => ({
										...prev,
										from: e.target.value,
									}));
								}}
							/>
						</View>
						<View style={loginStyle.inputContainer}>
							<Text style={loginStyle.inputLabel}>To</Text>
							<input
								type="date"
								style={{
									flex: 1,
									marginLeft: 4,
									border: "unset",
									outline: "none",
								}}
								onChange={(e) => {
									setDate((prev) => ({
										...prev,
										to: e.target.value,
									}));
								}}
							/>
						</View>
					</View>
					<Button label="Find" onPress={onFind} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default FilterList;
