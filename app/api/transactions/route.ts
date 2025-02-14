import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '../../models/transaction';
import axios from 'axios';

// Save and verify a transaction
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { reference } = await request.json();

    // Verify with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const paymentData = response.data.data;

    // Save to MongoDB
    const transaction = await Transaction.create({
      email: paymentData.customer.email,
      amount: paymentData.amount / 100,
      currency: paymentData.currency,
      reference: paymentData.reference,
      status: paymentData.status
    });

    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Transaction verification failed' },
      { status: 500 }
    );
  }
}

// Fetch all transactions (for admin dashboard)
export async function GET() {
  await dbConnect();

  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}