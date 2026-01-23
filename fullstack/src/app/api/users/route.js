import { connectDB } from "@/lib/db"
import User from "@/models/user"

export const runtime = "nodejs"

export async function GET() {
  try {
    await connectDB()
    const users = await User.find().sort({ createdAt: -1 })

    return new Response(JSON.stringify(users), { status: 200 })
  } catch (err) {
    console.error("GET USERS ERROR:", err)
    return new Response(
      JSON.stringify({ error: "Gagal mengambil data user" }),
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    await connectDB()
    const { name, email, role } = await req.json()

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name dan email wajib diisi" }),
        { status: 400 }
      )
    }

    const user = await User.create({ name, email, role })
    return new Response(JSON.stringify(user), { status: 201 })
  } catch (err) {
    console.error("CREATE USER ERROR:", err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    )
  }
}
