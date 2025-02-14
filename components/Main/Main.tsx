"use client";
import { useState } from "react";
import Booking from "@/components/Booking/Booking";
import Map from "@/components/Map/Map";

const Main = () => {
	const [whereFrom, setWhereFrom] = useState("");
	const [whereTo, setWhereTo] = useState("");
	const [fromCoords, setFromCoords] = useState({ latitude: 0, longitude: 0 });
	const [toCoords, setToCoords] = useState({ latitude: 0, longitude: 0 });

	const bookingProps = {
		whereFrom,
		setWhereFrom,
		whereTo,
		setWhereTo,
        fromCoords,
        setFromCoords,
        toCoords,
        setToCoords
	};
    console.log(fromCoords, toCoords)

	return (
		<section className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-3" style={{ paddingInline: "clamp(5rem, 4vw, 10rem)" }}>
			<Booking {...bookingProps} />
			<Map origin={whereFrom} destination={whereTo} />
		</section>
	);
};

export default Main;
