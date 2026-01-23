import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import Message from '../../../models/message';

export const runtime = "nodejs";

mongoose.connect(process.env.MONGO_URI);

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Email dan Pesan wajib diisi!' }), { status: 400 });
  }

  try {
    // Simpan ke MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      to: process.env.EMAIL_RECEIVER,
      replyTo: email, // ini penting!
      subject: `Pesan dari ${name}`,
      text: message,
    });

    return new Response(JSON.stringify({ success: true, message: 'Email & data berhasil dikirim!' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Gagal mengirim email' }), { status: 500 });
  }
}