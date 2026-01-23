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
    const formSchema = z.object({
      email: z.string().email(),
    });

    const parsed = formSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!parsed.success) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    const { error } = await resend.emails.send({
      from: "lainnyaakun83@gmail.com",
      to: [parsed.data.email],
      subject: "Thank you for contacting me",
      react: null,
    });

    if (error) {
      return {
        success: false,
        error: "Failed to send email",
      };
    }

    return {
      success: true,
      message: "Success! I'll get back to you soon.",
    };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : "Something went wrong",
    };
  }
}
