// src/app/api/hero/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Hero from '@/lib/models/Hero';

// GET - Fetch active hero
export async function GET() {
  try {
    await connectDB();
    const hero = await Hero.findOne({ isActive: true }).sort({ updatedAt: -1 });
    
    if (!hero) {
      return NextResponse.json(
        { error: 'No active hero found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero data' },
      { status: 500 }
    );
  }
}

// POST - Create new hero
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const hero = await Hero.create({
      ...body,
      isActive: true,
    });
    
    return NextResponse.json(hero, { status: 201 });
  } catch (error: any) {
    console.error('Error creating hero:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create hero' },
      { status: 500 }
    );
  }
}

// PUT - Update hero
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    if (!_id) {
      return NextResponse.json(
        { error: 'Hero ID is required' },
        { status: 400 }
      );
    }
    
    const hero = await Hero.findByIdAndUpdate(
      _id,
      { ...updateData },
      { new: true, runValidators: true }
    );
    
    if (!hero) {
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(hero);
  } catch (error: any) {
    console.error('Error updating hero:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update hero' },
      { status: 500 }
    );
  }
}