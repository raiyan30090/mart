import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['CUSTOMER', 'RESELLER', 'ADMIN'], default: 'CUSTOMER' },
  resellerId: { type: String, unique: true, sparse: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);