import dbConnect from '../lib/db';
import Admin from '../app/models/Admin';

async function seedAdmin() {
  await dbConnect();
  
  const adminData = {
    username: 'admin',
    password: 'securepassword123'
  };

  const existingAdmin = await Admin.findOne({ username: adminData.username });
  if (!existingAdmin) {
    const admin = new Admin(adminData);
    await admin.save();
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}

seedAdmin().catch(console.error);