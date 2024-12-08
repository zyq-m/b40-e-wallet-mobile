export default function toMYR(amount) {
	const formatter = new Intl.NumberFormat("ms-MY", {
		style: "currency",
		currency: "MYR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	return formatter.format(+amount);
}
