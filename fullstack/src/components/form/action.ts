"use server";

import { Resend } from "resend";
import * as z from "zod";

export type FormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: "Resend API Key tidak ditemukan",
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

    const { error } = await resend.emails.send({
      from: "PixelDev <onboarding@resend.dev>", // 🔥 FIX
      to: ["rendysulistyawan11@gmail.com"],
      replyTo: email,
      subject: `Pesan dari ${name}`,
      text: message,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return {
        success: false,
        error: "Failed to send email",
      };
    }

    return {
      success: true,
      message: "Email berhasil dikirim!",
    };
  } catch (err) {
    console.error("SERVER ACTION ERROR:", err);
    return {
      success: false,
      error: "Terjadi kesalahan server",
    };
  }
}
