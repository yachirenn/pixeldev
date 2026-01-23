import { connectDB } from "@/lib/db";
import User from "@/models/user";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 });
    return Response.json(users);
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    return Response.json(
      { error: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, role } = await req.json();

    if (!name || !email) {
      return Response.json(
        { error: "Name dan email wajib diisi" },
        { status: 400 }
      );
    }

    const user = await User.create({ name, email, role });
    return Response.json(user, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Terjadi kesalahan";

    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}
