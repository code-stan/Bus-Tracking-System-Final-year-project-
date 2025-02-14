import React, { useState } from "react";
import { TransitList } from "./data";
import Image from "next/image";
import "./index.css";
import { formatToNigerianCurrency } from "@/utils/utils";

// Define interface for Transit item
interface TransitItem {
	name: string;
	image: string;
	charge: number;
}

// Define props interface
interface SelectTransitProps {
	whereFrom: string;
	whereTo: string;
	onSelection?: (amount: number) => void;
}

const SelectTransit: React.FC<SelectTransitProps> = ({ onSelection, whereFrom, whereTo }) => {
	const [selectedTransit, setSelectedTransit] = useState<TransitItem | null>(null);

	const handleSelect = (transit: TransitItem, amountSelected: number) => {
		setSelectedTransit(transit);
		if (onSelection && whereFrom && whereTo) {
			onSelection(amountSelected);
		}
	};

	const calculateAmount = (whereFrom: string, whereTo: string, charge: number): number => {
		if ((whereFrom.includes("Nsukka") || whereFrom.includes("Enugu")) && whereTo.includes("Lagos")) {
			return charge * 35000;
		} else if ((whereFrom.includes("Nsukka") || whereFrom.includes("Enugu")) && whereTo.includes("Abuja")) {
			return charge * 22000;
		} else if ((whereFrom.includes("Nsukka") || whereFrom.includes("Enugu")) && whereTo.includes("Anambra")) {
			return charge * 6000;
		} else if ((whereFrom.includes("Nsukka") || whereFrom.includes("Enugu")) && whereTo.includes("Port Harcourt")) {
			return charge * 7000;
		}
		return charge * 15000;
	};

	return (
		<section className="mt-3">
			<h2 className="text-l font-semibold">Select Vehicle</h2>
			<div className="mt-2 border-[1px] shadow-sm p-4 rounded-md bg-white grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
				{TransitList.map((transit: TransitItem) => {
					const estimatedAmount = calculateAmount(whereFrom, whereTo, transit.charge);
					return (
						<div key={transit.name} onClick={() => handleSelect(transit, estimatedAmount)} className={`transit p-2 border-[1px] rounded-md transition-all cursor-pointer hover:border-black ${selectedTransit?.name === transit.name ? "border-blue-500 bg-blue-50" : ""}`}>
							<Image
								src={transit.image}
								alt={transit.name}
								width={175}
								height={90}
								quality={100}
								className={`object-cover ${transit.name.replace(/\s/g, "-").toLowerCase()}`}
								style={{
									width: "100%",
									height: "auto",
								}}
							/>
							<h3 className="font-medium pl-1 text-[12px]">{transit.name}</h3>
							<span className="font-medium pl-1 text-[12px] float-right">{whereFrom && whereTo && formatToNigerianCurrency(estimatedAmount)}</span>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default SelectTransit;
