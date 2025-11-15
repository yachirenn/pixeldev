import express from 'express';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js'; // pastikan file model ini ada

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // ✅ Validasi input
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Email tidak valid' });
  }

  try {
    // ✅ Simpan ke MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // ✅ Kirim email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        replyTo: email,                             // ini penting: email user bisa dibalas langsung
        subject: `Pesan baru dari ${name}`,
        text: `Pesan dari: ${name} <${email}>\n\n${message}`
    });


    res.status(200).json({ success: true, message: 'Email dan data berhasil dikirim' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengirim' });
  }
});

export default router;