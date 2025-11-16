import mongoose from 'mongoose';
import User from '../../../models/user';

// Pastikan koneksi MongoDB
mongoose.connect(process.env.MONGO_URI);

export async function GET() {
  try {
    const users = await User.find();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Gagal mengambil data user' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, email, role } = await req.json();
    const newUser = new User({ name, email, role });
    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}