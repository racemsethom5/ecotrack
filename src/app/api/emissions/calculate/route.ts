import { emissionsCalculator } from '@/src/lib/emissionsCalculator';
import connectDB from '@/src/lib/mongodb';
import EmissionRecord from '@/src/models/EmissionRecord';
import { CalculatorFormData } from '@/src/types';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData: CalculatorFormData = await request.json();

    const result = await emissionsCalculator.calculate(formData);

    const record = await EmissionRecord.create({
      householdSize: formData.householdSize,
      electricityData: formData.electricity || null,
      vehicleData: formData.vehicle || null,
      flightsData: formData.flights || null,
      shippingData: formData.shipping || null,
      fuelCombustionData: formData.fuelCombustion || null,
      dietType: formData.dietType,
      shoppingFrequency: formData.shoppingFrequency,
      totalEmissionsKg: result.totalEmissionsKg,
      breakdown: result.breakdown,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: record._id,
        totalEmissionsKg: result.totalEmissionsKg,
        breakdown: result.breakdown,
      },
    });

  } catch (error: any) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to calculate emissions' 
      },
      { status: 500 }
    );
  }
}