'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import StepHousehold from '../components/calculator/StepHousehold';
import StepEnergy from '../components/calculator/StepEnergy';
import StepTransportation from '../components/calculator/StepTransportation';
import StepLifestyle from '../components/calculator/StepLifestyle';
import StepResults from '../components/calculator/StepResults';


export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    householdSize: 1,
    country: 'DE',
    electricityValue: 0,
    electricityUnit: 'kwh' as 'kwh' | 'mwh',
    hasFuelCombustion: false,
    fuelSourceType: '',
    fuelSourceUnit: '',
    fuelSourceValue: 0,
    hasVehicle: false,
    vehicleDistance: 0,
    vehicleDistanceUnit: 'km' as 'km' | 'mi',
    vehicleModelId: '',
    hasFlights: false,
    flightPassengers: 1,
    departureAirport: '',
    destinationAirport: '',
    dietType: 'medium-meat' as 'vegan' | 'vegetarian' | 'low-meat' | 'medium-meat' | 'high-meat',
    shoppingFrequency: 'average' as 'minimal' | 'average' | 'frequent',
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    
    try {
      // Validation checks
      if (formData.householdSize < 1 || formData.householdSize > 20) {
        toast.error('⚠️ Household size must be between 1 and 20');
        setLoading(false);
        return;
      }

      if (formData.hasVehicle && !formData.vehicleModelId) {
        toast.error('⚠️ Please select a vehicle model');
        setLoading(false);
        return;
      }

      if (formData.hasVehicle && formData.vehicleDistance <= 0) {
        toast.error('⚠️ Please enter a valid vehicle distance');
        setLoading(false);
        return;
      }

      if (formData.hasFlights && (!formData.departureAirport || !formData.destinationAirport)) {
        toast.error('⚠️ Please enter both departure and destination airports');
        setLoading(false);
        return;
      }

      if (formData.hasFlights && (formData.departureAirport.length !== 3 || formData.destinationAirport.length !== 3)) {
        toast.error('⚠️ Airport codes must be 3 letters (e.g., FRA, JFK)');
        setLoading(false);
        return;
      }

      if (formData.hasFuelCombustion && (!formData.fuelSourceType || !formData.fuelSourceUnit)) {
        toast.error('⚠️ Please select fuel type and unit');
        setLoading(false);
        return;
      }

      if (formData.hasFuelCombustion && formData.fuelSourceValue <= 0) {
        toast.error('⚠️ Please enter a valid fuel amount');
        setLoading(false);
        return;
      }

      const requestData: any = {
        householdSize: formData.householdSize,
        dietType: formData.dietType,
        shoppingFrequency: formData.shoppingFrequency,
      };

      if (formData.electricityValue > 0) {
        requestData.electricity = {
          type: 'electricity',
          electricity_unit: formData.electricityUnit,
          electricity_value: formData.electricityValue,
          country: formData.country.toUpperCase(),
        };
      }

      if (formData.hasFuelCombustion && formData.fuelSourceValue > 0) {
        requestData.fuelCombustion = {
          type: 'fuel_combustion',
          fuel_source_type: formData.fuelSourceType,
          fuel_source_unit: formData.fuelSourceUnit,
          fuel_source_value: formData.fuelSourceValue,
        };
      }

      if (formData.hasVehicle && formData.vehicleModelId && formData.vehicleDistance > 0) {
        requestData.vehicle = {
          type: 'vehicle',
          distance_unit: formData.vehicleDistanceUnit,
          distance_value: formData.vehicleDistance,
          vehicle_model_id: formData.vehicleModelId,
        };
      }

      if (formData.hasFlights && formData.departureAirport && formData.destinationAirport) {
        requestData.flights = {
          type: 'flight',
          passengers: formData.flightPassengers,
          legs: [
            {
              departure_airport: formData.departureAirport.toUpperCase(),
              destination_airport: formData.destinationAirport.toUpperCase(),
            }
          ],
        };
      }

      const response = await fetch('/api/emissions/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('✅ Calculation completed successfully!');
        setResult(data.data);
        setStep(5);
      } else {
        if (data.details && Array.isArray(data.details)) {
          data.details.forEach((d: any) => {
            toast.error(`${d.field}: ${d.message}`);
          });
        } else {
          toast.error(data.error || 'Calculation failed');
        }
      }
    } catch (error) {
      toast.error('❌ Failed to calculate emissions. Please try again.');
      console.error('Calculation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setResult(null);
    setFormData({
      householdSize: 1,
      country: 'DE',
      electricityValue: 0,
      electricityUnit: 'kwh',
      hasFuelCombustion: false,
      fuelSourceType: '',
      fuelSourceUnit: '',
      fuelSourceValue: 0,
      hasVehicle: false,
      vehicleDistance: 0,
      vehicleDistanceUnit: 'km',
      vehicleModelId: '',
      hasFlights: false,
      flightPassengers: 1,
      departureAirport: '',
      destinationAirport: '',
      dietType: 'medium-meat',
      shoppingFrequency: 'average',
    });
    toast.success('Form reset successfully');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🌍 EcoTrack
            </h1>
            <p className="text-xl text-gray-600">
              Calculate your annual carbon footprint
            </p>
          </div>

          {/* Progress Bar */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-2 mx-1 rounded ${
                      s <= step ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Household</span>
                <span>Energy</span>
                <span>Transport</span>
                <span>Lifestyle</span>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {step <= 4 && (
              <h2 className="text-2xl font-bold mb-6">
                {step === 1 && 'Household Information'}
                {step === 2 && 'Energy Consumption'}
                {step === 3 && 'Transportation'}
                {step === 4 && 'Lifestyle'}
              </h2>
            )}

            {step === 1 && (
              <StepHousehold
                formData={formData}
                updateField={updateField}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <StepEnergy
                formData={formData}
                updateField={updateField}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <StepTransportation
                formData={formData}
                updateField={updateField}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 && (
              <StepLifestyle
                formData={formData}
                updateField={updateField}
                onCalculate={handleCalculate}
                onBack={() => setStep(3)}
                loading={loading}
              />
            )}

            {step === 5 && result && (
              <StepResults result={result} onReset={resetCalculator} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}