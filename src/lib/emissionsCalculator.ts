import { carbonAPI } from './carbonInterface';
import type { CalculatorFormData, CalculationResult, EmissionBreakdown } from '../types';

export class EmissionsCalculatorService {
  private readonly DIET_EMISSIONS = {
    vegan: 1500,
    vegetarian: 1700,
    'low-meat': 2000,
    'medium-meat': 2500,
    'high-meat': 3300,
  };

  private readonly SHOPPING_PACKAGES = {
    minimal: 10,
    average: 30,
    frequent: 60,
  };

  private readonly HOUSEHOLD_BASE_PER_PERSON = 500;

  // Emission factors per country (kg CO2 per kWh)
  private readonly ELECTRICITY_FACTORS: { [key: string]: number } = {
    de: 0.485,  // Germany
    us: 0.417,  // United States
    gb: 0.233,  // United Kingdom
    fr: 0.056,  // France (nuclear)
    es: 0.234,  // Spain
    it: 0.312,  // Italy
  };

  // Vehicle emissions (kg CO2 per km)
  private readonly VEHICLE_EMISSIONS_PER_KM = 0.192; // Average petrol car

  // Flight emissions (kg CO2)
  private readonly FLIGHT_EMISSIONS = {
    short: 250,   // < 1500 km
    medium: 600,  // 1500-4000 km
    long: 1200,   // > 4000 km
  };

  async calculate(data: CalculatorFormData): Promise<CalculationResult> {
    const breakdown: EmissionBreakdown = {
      household: 0,
      energy: 0,
      transportation: 0,
      lifestyle: 0,
    };

    breakdown.household = this.calculateHousehold(data.householdSize);
    breakdown.energy = await this.calculateEnergy(data);
    breakdown.transportation = await this.calculateTransportation(data);
    breakdown.lifestyle = await this.calculateLifestyle(data);

    const totalEmissionsKg = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

    return {
      totalEmissionsKg,
      breakdown,
    };
  }

  private calculateHousehold(size: number): number {
    return size * this.HOUSEHOLD_BASE_PER_PERSON;
  }

  private async calculateEnergy(data: CalculatorFormData): Promise<number> {
    let total = 0;

    // Electricity - Use fallback calculation
    if (data.electricity) {
      const kwhValue = data.electricity.electricity_unit === 'mwh' 
        ? data.electricity.electricity_value * 1000 
        : data.electricity.electricity_value;
      
      const country = data.electricity.country.toLowerCase();
      const emissionFactor = this.ELECTRICITY_FACTORS[country] || 0.5; // Default 0.5 kg/kWh
      
      total += kwhValue * emissionFactor;
      console.log(`Electricity: ${kwhValue} kWh × ${emissionFactor} = ${kwhValue * emissionFactor} kg CO2`);
    }

    // Fuel Combustion - Use fallback calculation
    if (data.fuelCombustion) {
      const fuelEmissionFactors: { [key: string]: number } = {
        ng: 0.184,   // Natural gas (kg CO2 per kWh)
        dfo: 0.265,  // Fuel oil
        bit: 0.340,  // Coal
        lpg: 0.214,  // Propane
      };

      const fuelType = data.fuelCombustion.fuel_source_type;
      const factor = fuelEmissionFactors[fuelType] || 0.2;
      
      total += data.fuelCombustion.fuel_source_value * factor;
      console.log(`Fuel: ${data.fuelCombustion.fuel_source_value} × ${factor} = ${data.fuelCombustion.fuel_source_value * factor} kg CO2`);
    }

    return total;
  }

  private async calculateTransportation(data: CalculatorFormData): Promise<number> {
    let total = 0;

    // Vehicle - Use fallback calculation
    if (data.vehicle) {
      const kmValue = data.vehicle.distance_unit === 'mi'
        ? data.vehicle.distance_value * 1.609
        : data.vehicle.distance_value;

      total += kmValue * this.VEHICLE_EMISSIONS_PER_KM;
      console.log(`Vehicle: ${kmValue} km × ${this.VEHICLE_EMISSIONS_PER_KM} = ${kmValue * this.VEHICLE_EMISSIONS_PER_KM} kg CO2`);
    }

    // Flights - Use fallback calculation
    if (data.flights && data.flights.legs && data.flights.legs.length > 0) {
      // Estimate based on typical routes
      const flightEmissions = this.FLIGHT_EMISSIONS.medium * data.flights.passengers;
      total += flightEmissions;
      console.log(`Flights: ${data.flights.passengers} passengers × ${this.FLIGHT_EMISSIONS.medium} = ${flightEmissions} kg CO2`);
    }

    return total;
  }

  private async calculateLifestyle(data: CalculatorFormData): Promise<number> {
    let total = 0;

    // Diet
    total += this.DIET_EMISSIONS[data.dietType];

    // Shopping - Use fallback calculation
    const packagesPerYear = this.SHOPPING_PACKAGES[data.shoppingFrequency];
    const shippingEmissions = packagesPerYear * 2 * 0.1; // 2kg per package, 0.1 kg CO2 per kg
    total += shippingEmissions;
    
    console.log(`Diet: ${this.DIET_EMISSIONS[data.dietType]} kg CO2`);
    console.log(`Shopping: ${packagesPerYear} packages = ${shippingEmissions} kg CO2`);

    return total;
  }
}

export const emissionsCalculator = new EmissionsCalculatorService();