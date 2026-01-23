"use server";

import { error } from "console";

export async function submitContactForm(
  _prevState: any,
  formData: FormData
) {
  try {
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
      return { success: false, error: "Invalid email" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return { success: false, error: "Failed to send email" };
    }

    return {
      success: true,
      message: "Success! I'll get back to you soon.",
    };
  } catch {
    return {
			success: false,
			error: "Something went wrong!",
		};
	};
};