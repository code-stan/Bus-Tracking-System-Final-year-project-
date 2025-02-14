const formatToNigerianCurrency = (number: number): string => {
	const format = new Intl.NumberFormat("ig-NG", { currencyDisplay: "narrowSymbol", style: "currency", currency: "NGN" }).format(number);
	return format;
};

export { formatToNigerianCurrency };
