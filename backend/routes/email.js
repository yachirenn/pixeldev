import express from 'express';
import { sendEmail } from '../controller/emailController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Request masuk:', req.body);
  res.json({ success: true, message: 'Email berhasil diterima' });
});

export default router;