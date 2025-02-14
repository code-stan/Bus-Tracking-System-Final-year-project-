import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Transaction from "../../../models/transaction";

export async function GET(
  request: Request,
  { params }: { params: { reference: string } }
) {
  await dbConnect();

  try {
    const { reference } = params;

    // Fetch the transaction
    const ticket = await Transaction.findOne({ reference });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching ticket details" },
      { status: 500 }
    );
  }
}
