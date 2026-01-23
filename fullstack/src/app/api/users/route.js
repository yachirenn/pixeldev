import dbConnect from "@/lib/mongodb";
import User from "@/models/user";

export async function GET() {
  try {
    await dbConnect();
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
    await dbConnect();
    const { name, email, role } = await req.json();

    const newUser = await User.create({ name, email, role });
    return Response.json(newUser, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: err.message },
      { status: 400 }
    );
  }
}