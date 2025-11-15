import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Request masuk ke /send:', req.body);

  try {
    // kirim email di sini
    res.status(200).json({ success: true, message: 'Email berhasil dikirim' });
  } catch (err) {
    console.error('❌ Error kirim email:', err);
    res.status(500).json({ success: false, message: 'Gagal kirim email' });
  }
});

export default router;
