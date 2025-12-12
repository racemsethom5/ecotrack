import connectDB from '@/src/lib/mongodb';
import EmissionRecord from '@/src/models/EmissionRecord';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const record = await EmissionRecord.findById(params.id);

    if (!record) {
      return NextResponse.json(
        { success: false, error: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: record,
    });

  } catch (error: any) {
    console.error('Get record error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch record' 
      },
      { status: 500 }
    );
  }
}