import toast from 'react-hot-toast';

interface StepTransportationProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTransportation({ formData, updateField, onNext, onBack }: StepTransportationProps) {
  const handleNext = () => {
    // Validate vehicle if enabled
    if (formData.hasVehicle) {
      if (formData.vehicleDistance <= 0) {
        toast.error('Please enter a valid vehicle distance (greater than 0)');
        return;
      }
      if (!formData.vehicleModelId) {
        toast.error('Please select a vehicle model');
        return;
      }
    }

    // Validate flights if enabled
    if (formData.hasFlights) {
      if (!formData.departureAirport || formData.departureAirport.length !== 3) {
        toast.error('Please enter a valid 3-letter departure airport code (e.g., FRA)');
        return;
      }
      if (!formData.destinationAirport || formData.destinationAirport.length !== 3) {
        toast.error('Please enter a valid 3-letter destination airport code (e.g., JFK)');
        return;
      }
      if (formData.flightPassengers < 1) {
        toast.error('Number of passengers must be at least 1');
        return;
      }
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.hasVehicle}
            onChange={(e) => updateField('hasVehicle', e.target.checked)}
            className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">I have a vehicle</span>
        </label>
      </div>

      {formData.hasVehicle && (
        <div className="space-y-4 pl-8 border-l-2 border-green-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Distance Traveled
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                min="0"
                value={formData.vehicleDistance}
                onChange={(e) => updateField('vehicleDistance', parseFloat(e.target.value) || 0)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="12000"
              />
              <select
                value={formData.vehicleDistanceUnit}
                onChange={(e) => updateField('vehicleDistanceUnit', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="km">km</option>
                <option value="mi">mi</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Model
            </label>
            <select
              value={formData.vehicleModelId}
              onChange={(e) => updateField('vehicleModelId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a vehicle</option>
              <option value="7268a9b7-17e8-4c8d-acca-57059252afe9">Toyota Corolla 1993</option>
              <option value="a2d97d19-14c0-4c60-870c-e734796e014e">Toyota Camry 1993</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.hasFlights}
            onChange={(e) => updateField('hasFlights', e.target.checked)}
            className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">I took flights this year</span>
        </label>
      </div>

      {formData.hasFlights && (
        <div className="space-y-4 pl-8 border-l-2 border-green-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departure Airport (IATA Code)
            </label>
            <input
              type="text"
              maxLength={3}
              value={formData.departureAirport}
              onChange={(e) => updateField('departureAirport', e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="FRA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Airport (IATA Code)
            </label>
            <input
              type="text"
              maxLength={3}
              value={formData.destinationAirport}
              onChange={(e) => updateField('destinationAirport', e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="JFK"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Passengers
            </label>
            <input
              type="number"
              min="1"
              value={formData.flightPassengers}
              onChange={(e) => updateField('flightPassengers', parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          Next: Lifestyle
        </button>
      </div>
    </div>
  );
}