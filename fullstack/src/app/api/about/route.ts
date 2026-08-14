import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import About from '@/lib/models/About';

export async function GET() {
  try {
    await connectDB();
    const about = await About.findOne({ isActive: true }).sort({ updatedAt: -1 });
    
    if (!about) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const about = await About.create({ ...body, isActive: true });
    return NextResponse.json(about, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    const about = await About.findByIdAndUpdate(_id, updateData, { new: true });
    
    if (!about) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json(about);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}