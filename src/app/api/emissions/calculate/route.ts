import { emissionsCalculator } from '@/src/lib/emissionsCalculator';
import connectDB from '@/src/lib/mongodb';
import { calculatorFormSchema } from '@/src/lib/validators/emissions';
import EmissionRecord from '@/src/models/EmissionRecord';
import { NextRequest, NextResponse } from 'next/server';

import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate with Zod
    const formData = calculatorFormSchema.parse(body);

    // Calculate emissions
    const result = await emissionsCalculator.calculate(formData);

    // Save to database
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

  } catch (error: unknown) {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Validation failed',
        details: (error as any).errors.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        }))
      },
      { status: 400 }
    );
  }

  // Handle other errors
  const errorMessage = error instanceof Error ? error.message : 'Failed to calculate emissions';
  console.error('Calculation error:', error);
  
  return NextResponse.json(
    { 
      success: false, 
      error: errorMessage
    },
    { status: 500 }
  );
}}