import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Transaction from "../../models/transaction";

export async function GET() {
  await dbConnect();

  try {
    const tickets = await Transaction.find().sort({ createdAt: -1 });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching tickets" },
      { status: 500 }
    );
  }
}
