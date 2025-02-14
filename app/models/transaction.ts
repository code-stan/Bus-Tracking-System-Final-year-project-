// models/transaction.ts
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  email: String,
  routeFrom: String,
  routeTo: String,
  amount: Number,
  currency: String,
  reference: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction || 
  mongoose.model('Transaction', TransactionSchema);