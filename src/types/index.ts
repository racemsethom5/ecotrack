export interface ElectricityEstimateRequest {
  type: 'electricity';
  electricity_unit: 'kwh' | 'mwh';
  electricity_value: number;
  country: string;
  state?: string;
}

export interface FlightEstimateRequest {
  type: 'flight';
  passengers: number;
  legs: {
    departure_airport: string;
    destination_airport: string;
    cabin_class?: 'economy' | 'premium';
  }[];
  distance_unit?: 'km' | 'mi';
}

export interface VehicleEstimateRequest {
  type: 'vehicle';
  distance_unit: 'km' | 'mi';
  distance_value: number;
  vehicle_model_id: string;
}

export interface ShippingEstimateRequest {
  type: 'shipping';
  weight_value: number;
  weight_unit: 'g' | 'kg' | 'lb' | 'mt';
  distance_value: number;
  distance_unit: 'km' | 'mi';
  transport_method: 'ship' | 'train' | 'truck' | 'plane';
}

export interface FuelCombustionEstimateRequest {
  type: 'fuel_combustion';
  fuel_source_type: string;
  fuel_source_unit: string;
  fuel_source_value: number;
}

export type EstimateRequest = 
  | ElectricityEstimateRequest 
  | FlightEstimateRequest 
  | VehicleEstimateRequest 
  | ShippingEstimateRequest
  | FuelCombustionEstimateRequest;

export interface CarbonAPIResponse {
  data: {
    id: string;
    type: 'estimate';
    attributes: {
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
      estimated_at: string;
      [key: string]: any;
    };
  };
}

export interface CalculatorFormData {
  householdSize: number;
  electricity?: ElectricityEstimateRequest;
  vehicle?: VehicleEstimateRequest;
  flights?: FlightEstimateRequest;
  shipping?: ShippingEstimateRequest;
  fuelCombustion?: FuelCombustionEstimateRequest;
  dietType: 'vegan' | 'vegetarian' | 'low-meat' | 'medium-meat' | 'high-meat';
  shoppingFrequency: 'minimal' | 'average' | 'frequent';
}

export interface EmissionBreakdown {
  household: number;
  energy: number;
  transportation: number;
  lifestyle: number;
}

export interface CalculationResult {
  totalEmissionsKg: number;
  breakdown: EmissionBreakdown;
}