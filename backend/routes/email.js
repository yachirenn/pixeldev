import express from 'express';
import { Resend } from 'resend';
import Message from '../models/message.js';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Email tidak valid' });
  }

  try {
    // Simpan ke MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Kirim email via Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev',    // nanti bisa diganti domain kamu
      to: process.env.EMAIL_RECEIVER,
      reply_to: email,
      subject: `Pesan baru dari ${name}`,
      html: `
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong><br>${message}</p>
      `
    });

    res.status(200).json({ success: true, message: 'Email dan data berhasil dikirim' });
  } catch (err) {
    console.error('❌ Error kirim email:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengirim email' });
  }
});

export default router;