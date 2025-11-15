import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Request masuk ke /send:', req.body);

  res.status(200).json({ success: true, message: 'Request diterima' });
});

export default router;
