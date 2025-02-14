import { Dispatch, SetStateAction } from "react";

export type BookingPropTypes = {
	whereFrom: string;
	setWhereFrom: Dispatch<SetStateAction<string>>;
	whereTo: string;
	setWhereTo: Dispatch<SetStateAction<string>>;
	fromCoords: Coordinates;
	setFromCoords: Dispatch<SetStateAction<Coordinates>>;
	toCoords: Coordinates;
	setToCoords: Dispatch<SetStateAction<Coordinates>>;
}

type Coordinates = {
  latitude: number;
  longitude: number;
};
