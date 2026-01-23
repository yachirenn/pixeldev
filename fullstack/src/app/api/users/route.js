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
