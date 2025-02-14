import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
AdminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
AdminSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default models.Admin || model('Admin', AdminSchema);