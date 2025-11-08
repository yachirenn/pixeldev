import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
  const { email, message } = req.body;

  if(!email || !message) {
    return res.status(400).json({ error: 'Email dan Pesan wajib diisi!' });
  }
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_RECEIVER,
      subject: `Pesan dari ${email}`,
      text: message,
    });

    res.status(200).json({ success: true, message: 'Email berhasil dikirim!' });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Gagal mengirim email' });
  }
};