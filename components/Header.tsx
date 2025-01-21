"use client";

import Link from "next/link";
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
	const { user } = useUser();
	return (
		<header className="bg-white shadow" >
			<nav className="container mx-auto px-5 py-4 flex justify-between items-center" style={{paddingInline: "clamp(5rem, 4vw, 10rem)"}}>
				<div className="flex gap-12 items-center">
					<Link href="/" className="text-xl font-bold">
						TransitFlow
					</Link>
					<div className="hidden md:flex items-center gap-4">
						<Link href="/" className="font-medium hover:bg-gray-100 p-1 px-1.5 rounded-md cursor-pointer transition-all">
							Home
						</Link>
						<Link href="/" className="font-medium hover:bg-gray-100 p-1 px-1.5 rounded-md cursor-pointer transition-all">
							History
						</Link>
						<Link href="/" className="font-medium hover:bg-gray-100 p-1 px-1.5 rounded-md cursor-pointer transition-all">
							Help
						</Link>
					</div>
				</div>
				<div className="flex items-center">
					{user ? (
						<>
							<span className="mr-4">Welcome, {user?.firstName || "User"}</span>
							<div className="account-cta">
								<SignedIn>
									<UserButton />
								</SignedIn>
							</div>
						</>
					) : (
						<SignedOut>
							<SignInButton />
						</SignedOut>
					)}
				</div>
			</nav>
		</header>
	);
}
