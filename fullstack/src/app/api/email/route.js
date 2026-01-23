import nodemailer from "nodemailer"
import mongoose from "mongoose"
import Message from "../../../models/message"

export const runtime = "nodejs"

let isConnected = false

async function connectDB() {
  if (isConnected) return

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI tidak ada di ENV")
  }

  await mongoose.connect(process.env.MONGO_URI)
  isConnected = true
}

export async function POST(req) {
  try {
    await connectDB()

    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Email dan Pesan wajib diisi!" }),
        { status: 400 }
      )
    }

    // simpan ke DB
    const newMessage = new Message({ name, email, message })
    await newMessage.save()

    // cek ENV email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
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
      JSON.stringify({ success: true, message: "Email & data berhasil dikirim!" }),
      { status: 200 }
    )
  } catch (err) {
    console.error("EMAIL API ERROR:", err)

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Gagal mengirim email",
      }),
      { status: 500 }
    )
  }
}
