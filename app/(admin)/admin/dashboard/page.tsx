import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import Admin from '../../../models/Admin';
import dbConnect from '@/lib/db';

export default async function AdminDashboard() {
  const cookieStore = (await cookies());
  const token = cookieStore.get('adminToken')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { adminId: string };
    await dbConnect();
    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      redirect('/admin/login');
    }

    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>Welcome, {admin.username}!</p>
          {/* Add dashboard content here */}
        </div>
      </div>
    );
  } catch (error) {
    redirect('/admin/login');
  }
}