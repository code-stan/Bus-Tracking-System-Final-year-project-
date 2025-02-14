import UserEmail from "../UserEmail/UserEmail";
import PaystackButton from "../Payment/PaystackButton";

interface BillingProps {
	email: string | null;
	setEmail: (email: string | null) => void;
	selectedAmount: number;
}
const Billing = ({ selectedAmount, email, setEmail }: BillingProps) => {
    const eligible = email && email.length > 9 && email.includes("@") ? true : false
	return (
		<section className="mt-3">
            <h2 className="text-l font-semibold">Billing Details</h2>
			<div className="mt-2 border-[1px] shadow-sm p-4 rounded-md bg-white">
				{selectedAmount && <UserEmail email={email} setEmail={setEmail} />}
				{selectedAmount && eligible && <PaystackButton amount={selectedAmount} email={email} eligble={eligible}/>}
			</div>
		</section>
	);
};

export default Billing;
