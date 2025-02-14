"use client";
import { useState } from "react";
import Radar from "radar-sdk-js";
import { BookingPropTypes } from "@/types/booking.types";

Radar.initialize(process.env.NEXT_PUBLIC_RADAR_TEST_PUBLISHABLE || "");

interface RadarAddress {
	placeLabel: string;
	country: string;
	formattedAddress: string;
	location: {
		latitude: number;
		longitude: number;
	};
}

interface RadarAutocompleteResponse {
	addresses: RadarAddress[];
}

const AutoCompleteAddress = ({ whereFrom, setWhereFrom, whereTo, setWhereTo, setFromCoords, setToCoords }: BookingPropTypes) => {
	const [fromSuggestions, setFromSuggestions] = useState<RadarAddress[]>([]);
	const [toSuggestions, setToSuggestions] = useState<RadarAddress[]>([]);

	const handleAutocomplete = async (query: string, setSuggestions: React.Dispatch<React.SetStateAction<RadarAddress[]>>) => {
		if (!query) {
			setSuggestions([]);
			return;
		}

		try {
			const result = await Radar.autocomplete({
				query,
				layers: ["place"],
				limit: 20,
			});

			const addresses = (result as unknown as RadarAutocompleteResponse).addresses;
			setSuggestions(addresses);
		} catch (error) {
			console.error("Error fetching autocomplete suggestions:", error);
		}
	};

	const formatAddress = (address: RadarAddress) => {
		return `${address.placeLabel}, ${address.formattedAddress}`;
	};

	return (
		<section className="mt-4 border-[1px] shadow-sm p-4 rounded-md bg-white">
			{/* "Where From" Input */}
			<div className="mb-4">
				<label htmlFor="whereFrom" className="text-gray-400">
					Where From
				</label>
				<input
					type="text"
					id="whereFrom"
					className="bg-white border-[1px] p-1 w-full rounded-md text-sm outline-none"
					value={whereFrom}
					onChange={(e) => {
						setWhereFrom(e.target.value);
						handleAutocomplete(e.target.value, setFromSuggestions);
					}}
				/>
				{/* Suggestions Dropdown */}
				{fromSuggestions.length > 0 && (
					<ul className="border-[1px] border-gray-300 mt-2 rounded-md bg-white max-h-40 overflow-auto">
						{fromSuggestions.map((address, index) => (
							<li
								key={index}
								className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
								onClick={() => {
									setWhereFrom(formatAddress(address));
									setFromCoords(address.location); // Set coordinates
									setFromSuggestions([]);
								}}
							>
								{formatAddress(address)}
							</li>
						))}
					</ul>
				)}
			</div>

			{/* "Where To" Input */}
			<div>
				<label htmlFor="whereTo" className="text-gray-400">
					Where To
				</label>
				<input
					type="text"
					id="whereTo"
					className="bg-white border-[1px] p-1 w-full rounded-md text-sm outline-none"
					value={whereTo}
					onChange={(e) => {
						setWhereTo(e.target.value);
						handleAutocomplete(e.target.value, setToSuggestions);
					}}
				/>
				{/* Suggestions Dropdown */}
				{toSuggestions.length > 0 && (
					<ul className="border-[1px] border-gray-300 mt-2 rounded-md bg-white max-h-40 overflow-auto">
						{toSuggestions.map((address, index) => (
							<li
								key={index}
								className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
								onClick={() => {
									setWhereTo(formatAddress(address));
									setToCoords(address.location); // Set coordinates
									setToSuggestions([]);
								}}
							>
								{formatAddress(address)}
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default AutoCompleteAddress;
