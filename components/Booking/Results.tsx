import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import { useEffect, useRef } from "react";

const Results = () => {
	const autocompleteRef = useRef(null);

	useEffect(() => {
		Radar.initialize(process.env.RADAR_TEST_PUBLISHABLE || "");

		if (autocompleteRef) {
			autocompleteRef.current = Radar.ui.autocomplete({
				container: "autocomplete",
				width: "600px",
				onSelection: (address) => {
					// Do something with the selected address
					console.log(address);
				},
			});
		}

		return () => {
			autocompleteRef.current?.remove();
		};
	}, []);

	return <div id="autocomplete" ref={autocompleteRef} />;
};

export default Results;
