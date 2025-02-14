interface UserEmailProps {
	email: string | null;
	setEmail: (email: string | null) => void;
}

const UserEmail = ({ email, setEmail }: UserEmailProps) => {
	return (
		<section className="mb-4">
			<label className="text-gray-400">Enter Billing Email</label>
			<input 
				type="email" value={email || ""} 
				className="bg-white border-[1px] mt-1 p-1 w-full rounded-md text-sm outline-none" 
				onChange={(e) => setEmail(e.target.value)} 
			/>
		</section>
	);
};

export default UserEmail;
