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

    // Electricity
    if (data.electricity) {
      try {
        const response = await carbonAPI.createEstimate(data.electricity);
        total += response.data.attributes.carbon_kg;
      } catch (error) {
        console.error('Electricity calculation error:', error);
        const kwhValue = data.electricity.electricity_unit === 'mwh' 
          ? data.electricity.electricity_value * 1000 
          : data.electricity.electricity_value;
        total += kwhValue * 0.5;
      }
    }

    // Fuel Combustion
    if (data.fuelCombustion) {
      try {
        const response = await carbonAPI.createEstimate(data.fuelCombustion);
        total += response.data.attributes.carbon_kg;
      } catch (error) {
        console.error('Fuel combustion calculation error:', error);
      }
    }

    return total;
  }

  private async calculateTransportation(data: CalculatorFormData): Promise<number> {
    let total = 0;

    if (data.vehicle) {
      try {
        const response = await carbonAPI.createEstimate(data.vehicle);
        total += response.data.attributes.carbon_kg;
      } catch (error) {
        console.error('Vehicle calculation error:', error);
      }
    }

    if (data.flights) {
      try {
        const response = await carbonAPI.createEstimate(data.flights);
        total += response.data.attributes.carbon_kg;
      } catch (error) {
        console.error('Flight calculation error:', error);
      }
    }

    return total;
  }

  private async calculateLifestyle(data: CalculatorFormData): Promise<number> {
    let total = 0;

    total += this.DIET_EMISSIONS[data.dietType];

    const packagesPerYear = this.SHOPPING_PACKAGES[data.shoppingFrequency];
    
    try {
      const response = await carbonAPI.createEstimate({
        type: 'shipping',
        weight_value: packagesPerYear * 2,
        weight_unit: 'kg',
        distance_value: packagesPerYear * 200,
        distance_unit: 'km',
        transport_method: 'truck',
      });
      
      total += response.data.attributes.carbon_kg;
    } catch (error) {
      console.error('Shopping calculation error:', error);
      const fallbackShopping = {
        minimal: 300,
        average: 800,
        frequent: 1500,
      };
      total += fallbackShopping[data.shoppingFrequency];
    }

    return total;
  }
}

export const emissionsCalculator = new EmissionsCalculatorService();