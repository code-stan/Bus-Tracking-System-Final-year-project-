"use client";
import { useState } from "react";
import Radar from "radar-sdk-js";

Radar.initialize(process.env.NEXT_PUBLIC_RADAR_TEST_PUBLISHABLE || "");

interface RadarAddress {
	placeLabel: string;
	country: string;
	formattedAddress: string;
}

interface RadarAutocompleteResponse {
	addresses: RadarAddress[];
}

const AutoCompleteAddress = () => {
	const [whereFrom, setWhereFrom] = useState("");
	const [whereTo, setWhereTo] = useState("");
	const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
	const [toSuggestions, setToSuggestions] = useState<string[]>([]);

	const handleAutocomplete = async (query: string, setSuggestions: React.Dispatch<React.SetStateAction<string[]>>) => {
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

			const suggestions = (result as RadarAutocompleteResponse).addresses
				.map((address) => {
					const formattedAddress = `${address?.placeLabel}, ${address?.formattedAddress}` || "";
					return formattedAddress;
				})
				.filter((suggestion): suggestion is string => suggestion !== undefined);

			setSuggestions(suggestions);
		} catch (error) {
			console.error("Error fetching autocomplete suggestions:", error);
		}
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
						{fromSuggestions.map((suggestion, index) => (
							<li key={index} className="p-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => setWhereFrom(suggestion)}>
								{suggestion}
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
						{toSuggestions.map((suggestion, index) => (
							<li key={index} className="p-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => setWhereTo(suggestion)}>
								{suggestion}
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default AutoCompleteAddress;
