"use server";

import nodemailer from 'nodemailer';
import * as z from "zod";

export type FormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return {
        success: false,
        error: "Email server belum dikonfigurasi",
      };
    }

    const schema = z.object({
      email: z.string().email(),
      message: z.string().min(1),
      name: z.string().min(1),
    });

    const parsed = schema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!parsed.success) {
      return {
        success: false,
        error: "Form tidak valid",
      };
    }

    const { name, email, message } = parsed.data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,          // pixeldevelop33@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD,  // APP PASSWORD
      },
    });

    await transporter.sendMail({
      from: `"PixelDev Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email, // INI YANG PENTING
      subject: `Pesan dari ${name}`,
      text: `
Nama   : ${name}
Email  : ${email}

Pesan:
${message}
      `,
    });

    return {
      success: true,
      message: "Pesan berhasil dikirim!",
    };
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return {
      success: false,
      error: "Gagal mengirim pesan",
    };
  }
}
