// app/api/paystack/verify/route.ts
import { NextResponse } from 'next/server';

interface VerifyResponse {
  status: boolean;
  data: {
    amount: number;
    currency: string;
    status: 'success' | 'failed';
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data: VerifyResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Verification failed' },
      { status: 500 }
    );
  }
}