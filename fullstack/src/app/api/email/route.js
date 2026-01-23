import nodemailer from "nodemailer"
import { connectDB } from "@/lib/db"
import Message from "@/models/message"

export const runtime = "nodejs"

export async function POST(req) {
  try {
    await connectDB()

    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Semua field wajib diisi" }),
        { status: 400 }
      )
    }

    // simpan ke MongoDB
    await Message.create({ name, email, message })

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.EMAIL_RECEIVER
    ) {
      throw new Error("ENV EMAIL belum lengkap")
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `Pesan dari ${name}`,
      text: message,
    })

    return new Response(
      JSON.stringify({ success: true, message: "Email berhasil dikirim" }),
      { status: 200 }
    )
  } catch (err) {
    console.error("EMAIL API ERROR:", err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    )
  }
}
