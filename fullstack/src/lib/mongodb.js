import mongoose from "mongoose"

let isConnected = false

export async function connectDB() {
  if (isConnected) return

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI tidak ditemukan di ENV")
  }

  await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false,
  })

  isConnected = true
}
