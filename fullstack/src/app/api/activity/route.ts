import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Activity from '@/lib/models/Activity';

export async function GET() {
  try {
    await connectDB();
    const activities = await Activity.find({ isActive: true }).sort({ date: -1 });
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const activity = await Activity.create(body);
    return NextResponse.json(activity, { status: 201 });
  } catch (error: any) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
  }
}