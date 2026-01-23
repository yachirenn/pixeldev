export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return Response.json(users);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const user = await User.create(body);
    return Response.json(user, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
