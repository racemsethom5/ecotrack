import { z } from 'zod';

// Electricity validation
export const electricitySchema = z.object({
  type: z.literal('electricity'),
  electricity_unit: z.enum(['kwh', 'mwh']),
  electricity_value: z.number().min(0).max(1000000),
  country: z.string().length(2).regex(/^[A-Z]{2}$/),
  state: z.string().optional(),
});

// Vehicle validation
export const vehicleSchema = z.object({
  type: z.literal('vehicle'),
  distance_unit: z.enum(['km', 'mi']),
  distance_value: z.number().min(0).max(100000),
  vehicle_model_id: z.string().min(1),
});

// Flight validation
export const flightSchema = z.object({
  type: z.literal('flight'),
  passengers: z.number().int().min(1).max(10),
  legs: z.array(z.object({
    departure_airport: z.string().length(3).regex(/^[A-Z]{3}$/),
    destination_airport: z.string().length(3).regex(/^[A-Z]{3}$/),
    cabin_class: z.enum(['economy', 'premium']).optional(),
  })).min(1),
  distance_unit: z.enum(['km', 'mi']).optional(),
});

// Shipping validation
export const shippingSchema = z.object({
  type: z.literal('shipping'),
  weight_value: z.number().min(0),
  weight_unit: z.enum(['g', 'kg', 'lb', 'mt']),
  distance_value: z.number().min(0),
  distance_unit: z.enum(['km', 'mi']),
  transport_method: z.enum(['ship', 'train', 'truck', 'plane']),
});

// Fuel combustion validation
export const fuelCombustionSchema = z.object({
  type: z.literal('fuel_combustion'),
  fuel_source_type: z.string().min(1),
  fuel_source_unit: z.string().min(1),
  fuel_source_value: z.number().min(0),
});

// Main calculator form validation
export const calculatorFormSchema = z.object({
  householdSize: z.number().int().min(1).max(20),
  electricity: electricitySchema.optional(),
  vehicle: vehicleSchema.optional(),
  flights: flightSchema.optional(),
  shipping: shippingSchema.optional(),
  fuelCombustion: fuelCombustionSchema.optional(),
  dietType: z.enum(['vegan', 'vegetarian', 'low-meat', 'medium-meat', 'high-meat']),
  shoppingFrequency: z.enum(['minimal', 'average', 'frequent']),
});

export type CalculatorFormInput = z.infer<typeof calculatorFormSchema>;