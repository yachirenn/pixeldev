import { Resend } from "resend";
import ContactThankYouEmail from "./contact-template";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "PixelDev <onboarding@resend.dev>", // WAJIB domain valid
      to: [email],
      subject: "Thank you for contacting me",
      react: ContactThankYouEmail(),
    });

    if (error) {
      console.error(error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
