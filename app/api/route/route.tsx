import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  if (!origin || !destination) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.radar.io/v1/route/directions?origin=${origin}&destination=${destination}&modes=car&units=imperial`, {
      headers: {
        'Authorization': process.env.RADAR_SECRET_KEY || '',
      }
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch route' }, { status: 500 });
  }
}