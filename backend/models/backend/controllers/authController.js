import User from '../models/User.js';
import Wallet from '../models/Wallet.js';

export const registerUser = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'ফোন নম্বরটি পূর্বে ব্যবহৃত হয়েছে' });
    }

    let resellerId = null;
    if (role === 'RESELLER') {
      resellerId = `RESELLER-${Math.floor(10000 + Math.random() * 90000)}`;
    }

    const user = await User.create({ name, phone, password, role, resellerId });

    if (role === 'RESELLER') {
      await Wallet.create({ user: user._id, balance: 0 });
    }

    res.status(201).json({ success: true, message: 'রেজিস্ট্রেশন সফল হয়েছে!', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone, password });

    if (!user) {
      return res.status(401).json({ success: false, message: 'ফোন নম্বর বা পাসওয়ার্ড ভুল' });
    }

    res.json({ success: true, message: 'লগইন সফল হয়েছে!', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};