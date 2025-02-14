"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Main from "@/components/Main/Main";
import { UserLocationContext } from "@/context/UserLocationContext";

export default function Home() {
	const [userLocation, setUserLocation] = useState<any>();

	useEffect(()=>{
		getUserLocation()
	}, [])
	const getUserLocation = () => {
		navigator.geolocation.getCurrentPosition(function (pos) {
			setUserLocation({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude,
			});
		});
	};
	return (
		<main className="min-h-screen bg-gray-50">
			<UserLocationContext.Provider value={{userLocation, setUserLocation}}>
				<Header />
				<Main />
			</UserLocationContext.Provider>
		</main>
	);
}
