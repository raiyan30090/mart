import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Local Connection Setup
mongoose.connect('mongodb://127.0.0.1:27017/mart_express_db')
  .then(() => console.log('🍃 MongoDB Database Connected Successfully'))
  .catch(err => console.error('Database connection error:', err));

// Serve Frontend Files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

// App Entry Point
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Mart Express BD Running at http://localhost:${PORT}`);
});