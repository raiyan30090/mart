import express from 'express';
import { requestAddBalance, approveBalance, getPendingTransactions } from '../controllers/walletController.js';

const router = express.Router();

router.post('/add-balance', requestAddBalance);
router.post('/admin/approve', approveBalance);
router.get('/admin/pending', getPendingTransactions);

export default router;