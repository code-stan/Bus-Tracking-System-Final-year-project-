// components/PaystackButton.jsx
'use client';
import { formatToNigerianCurrency } from '@/utils/utils';
import { useEffect, useState } from 'react';

export default function PaystackButton({ amount, email }: {amount?:number, email?: string}) {
  const [isLoading, setIsLoading] = useState(false);
 const [paystackLoaded, setPaystackLoaded] = useState(false);

    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!amount || !email) {
      alert("Please enter both email and amount");
      return;
    }

    const amountInKobo = amount * 100;

    // @ts-ignore - PaystackPop is loaded from the external script
    const paystack = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY,
      email: email,
      amount: amountInKobo,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      onClose: () => {
        alert("Payment closed");
      },
      callback: (response: any) => {
        alert("Payment complete! Reference: " + response.reference);
      },
    });

    paystack.openIframe();
  };
  return (
    
    <button
      onClick={handlePayment}
      disabled={!paystackLoaded || ( !amount && !email )}
      className={`w-full bg-green-600 p-2 rounded-md text-red-50 mt-4 hover:opacity-80 font-medium disabled:bg-gray-400 transition-colors`}
    >
      {isLoading ? 'Processing...' : `Pay ${formatToNigerianCurrency(amount || 0)}`}
    </button>
  );
}