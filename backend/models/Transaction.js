import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['ADD_BALANCE', 'ORDER_PAYMENT', 'COMMISSION', 'WITHDRAWAL', 'REFUND'], 
    required: true 
  },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['BKASH', 'NAGAD', 'ROCKET', 'BANK'], required: true },
  gatewayTrxId: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);