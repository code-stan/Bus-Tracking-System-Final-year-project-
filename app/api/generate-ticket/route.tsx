import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '../../models/transaction';
import axios from 'axios';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, routeFrom, routeTo, reference } = await request.json();

    // 1. Verify transaction with Paystack
    const verifyUrl = `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`;
    const response = await axios.get(verifyUrl, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    // 2. Check if Paystack verification succeeded
    if (!response.data.status || !response.data.data) {
      return NextResponse.json(
        { error: 'Transaction verification failed' },
        { status: 400 }
      );
    }

    const paymentData = response.data.data;

    // 3. Save transaction data with route details
    const ticket = await Transaction.create({
      email,
      routeFrom,
      routeTo,
      amount: paymentData.amount / 100, // Convert from kobo/cent
      currency: paymentData.currency,
      reference: paymentData.reference,
      status: paymentData.status,
    });

    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Transaction processing failed' },
      { status: 500 }
    );
  }
}

// GET method remains unchanged