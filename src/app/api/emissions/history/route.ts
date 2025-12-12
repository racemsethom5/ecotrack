import connectDB from '@/src/lib/mongodb';
import EmissionRecord from '@/src/models/EmissionRecord';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    const records = await EmissionRecord.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({
      success: true,
      data: records,
    });

  } catch (error: any) {
    console.error('Get history error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch history' 
      },
      { status: 500 }
    );
  }
}