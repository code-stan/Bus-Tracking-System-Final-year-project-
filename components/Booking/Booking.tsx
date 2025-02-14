import { useState } from "react";
// import Payment from "../Payment/Payment";
import SelectTransit from "../SelectTransit/SelectTransit";
import AutoCompleteAddress from "./AutoCompleteAddress";
import { BookingPropTypes } from "@/types/booking.types";
import Billing from "../Billing/Billing";

const Booking = ({ whereFrom, setWhereFrom, whereTo, setWhereTo, fromCoords, setFromCoords, toCoords, setToCoords }: BookingPropTypes) => {
	const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	// Handle transit selection from child component
	const handleTransitSelection = (amount: number) => {
		setSelectedAmount(amount);
	};

	const bookingProps = {
		whereFrom,
		setWhereFrom,
		whereTo,
		setWhereTo,
		fromCoords,
		setFromCoords,
		toCoords,
		setToCoords,
	};

	return (
		<div className="border-[1px] p-4 rounded-md">
			<h2 className="text-xl font-semibold">Booking</h2>
			<AutoCompleteAddress {...bookingProps} />
		  {whereFrom && whereTo && <SelectTransit onSelection={handleTransitSelection} whereFrom={whereFrom} whereTo={whereTo}/>}
			{selectedAmount && <Billing selectedAmount={selectedAmount} email={email} setEmail={setEmail} />}
		</div>
	);
};

export default Booking;
