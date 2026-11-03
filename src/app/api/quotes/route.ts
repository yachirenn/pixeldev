import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Quote from '@/lib/models/Quote';

export async function GET() {
  try {
    await connectDB();
    const quotes = await Quote.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const quote = await Quote.create(body);
    return NextResponse.json(quote, { status: 201 });
  } catch (error: any) {
    console.error('Error creating quote:', error);
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}