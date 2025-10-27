import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rendysulistyawan11@gmail.com", // ganti dengan email kamu
      pass: "PixelDev_2025!", // gunakan App Password jika pakai Gmail
    },
  });

  const mailOptions = {
    from: email,
    to: "sijasyifa@gmail.com", // ganti dengan email temanmu
    subject: "Pesan Baru dari Website",
    text: `Email: ${email}\n\nPesan:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email failed to send" });
  }
}