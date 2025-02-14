"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminSignInForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const { data } = await axios.post(
				"/api/admin/login",
				{ username, password },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(data);
			router.push("/admin/dashboard");
		} catch (err: unknown) {
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold mb-6 text-center">Admin Sign In</h2>

				{error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">{error}</div>}

				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
						Username
					</label>
					<input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
				</div>

				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
						Password
					</label>
					<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
				</div>

				<button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
					Sign In
				</button>
			</form>
		</div>
	);
}
