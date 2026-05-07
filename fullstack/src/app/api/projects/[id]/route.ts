import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db/db"
import Project from "@/models/Project"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    await connectDB()

    const updated = await Project.findByIdAndUpdate(id, body, {
      new: true,
    })

    if (!updated) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("PUT /api/projects error:", error)
    return NextResponse.json({ message: "Update failed" }, { status: 500 })
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await connectDB()

    const deleted = await Project.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted" })
  } catch (error) {
    console.error("DELETE /api/projects error:", error)
    return NextResponse.json({ message: "Delete failed" }, { status: 500 })
  }
}