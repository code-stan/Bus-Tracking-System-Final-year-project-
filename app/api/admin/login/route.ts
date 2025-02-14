import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '../../../models/Admin';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, password } = await request.json();

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 hour
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}