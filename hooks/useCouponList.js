import { useState, useEffect } from "react";
import { api } from "../services/axiosInstance";
import { useUserContext } from "./useUserContext";

export const useCoupon = () => {
	const [coupons, setCoupons] = useState([]);
	const { user } = useUserContext();

	const onSelect = (id) => {
		setCoupons((prev) =>
			prev.map((coupon) => ({ ...coupon, active: coupon.id === id }))
		);
	};

	useEffect(() => {
		api.get(`/student/${user?.id}`)
			.then((res) => {
				setCoupons(
					res.data?.coupons.map((coupon, i) => ({
						...coupon,
						active: i === 0,
					}))
				);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return { coupons, onSelect, setCoupons };
};
