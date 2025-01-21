import { Suspense } from "react";
import Header from "@/components/Header";
import Booking from "@/components/Booking/Booking";
import Map from "@/components/Map/Map";

export default function Home() {
	return (
		<main className="min-h-screen bg-gray-50">
			<Header />
			<section className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-3" style={{paddingInline: "clamp(5rem, 4vw, 10rem)"}}>
				<Booking />
				<Map />
			</section>
		</main>
	);
}
