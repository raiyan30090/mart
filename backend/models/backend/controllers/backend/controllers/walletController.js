import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';

export const requestAddBalance = async (req, res) => {
  try {
    const { userId, amount, paymentMethod, gatewayTrxId } = req.body;

    const transaction = await Transaction.create({
      transactionId: `TXN-${Date.now()}`,
      user: userId,
      type: 'ADD_BALANCE',
      amount,
      paymentMethod,
      gatewayTrxId,
      status: 'PENDING'
    });

    res.status(201).json({ success: true, message: 'পেমেন্ট রিকোয়েস্ট জমা হয়েছে!', data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveBalance = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const transaction = await Transaction.findById(transactionId);

    if (!transaction || transaction.status !== 'PENDING') {
      return res.status(400).json({ success: false, message: 'ট্রানজেকশনটি সঠিক নয়' });
    }

    const wallet = await Wallet.findOne({ user: transaction.user });
    if (!wallet) {
      return res.status(404).json({ success: false, message: 'ওয়ালেট পাওয়া যায়নি' });
    }

    wallet.balance += transaction.amount;
    await wallet.save();

    transaction.status = 'APPROVED';
    await transaction.save();

    res.json({ success: true, message: 'ব্যালেন্স সফলভাবে এপ্রুভ ও যোগ করা হয়েছে!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPendingTransactions = async (req, res) => {
  try {
    const pending = await Transaction.find({ status: 'PENDING' }).populate('user', 'name phone resellerId');
    res.json({ success: true, data: pending });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};