import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
