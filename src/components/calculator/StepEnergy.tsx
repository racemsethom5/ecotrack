import toast from 'react-hot-toast';

interface StepEnergyProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepEnergy({ formData, updateField, onNext, onBack }: StepEnergyProps) {
  const handleNext = () => {
    // Validate fuel combustion if enabled
    if (formData.hasFuelCombustion) {
      if (!formData.fuelSourceType) {
        toast.error('Please select a fuel type');
        return;
      }
      if (!formData.fuelSourceUnit) {
        toast.error('Please select a fuel unit');
        return;
      }
      if (formData.fuelSourceValue <= 0) {
        toast.error('Please enter a valid fuel amount');
        return;
      }
    }
    
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Annual Electricity Consumption
        </label>
        <div className="flex gap-4">
          <input
            type="number"
            min="0"
            value={formData.electricityValue}
            onChange={(e) => updateField('electricityValue', parseFloat(e.target.value) || 0)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="3500"
          />
          <select
            value={formData.electricityUnit}
            onChange={(e) => updateField('electricityUnit', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="kwh">kWh</option>
            <option value="mwh">MWh</option>
          </select>
        </div>
        <p className="text-sm text-gray-500 mt-1">Check your electricity bill</p>
      </div>

      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.hasFuelCombustion}
            onChange={(e) => updateField('hasFuelCombustion', e.target.checked)}
            className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">I use fuel for heating</span>
        </label>
      </div>

      {formData.hasFuelCombustion && (
        <div className="space-y-4 pl-8 border-l-2 border-green-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Source Type
            </label>
            <select
              value={formData.fuelSourceType}
              onChange={(e) => updateField('fuelSourceType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select fuel type</option>
              <option value="ng">Natural Gas</option>
              <option value="dfo">Distillate Fuel Oil</option>
              <option value="bit">Bituminous Coal</option>
              <option value="lpg">Propane Gas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                min="0"
                value={formData.fuelSourceValue}
                onChange={(e) => updateField('fuelSourceValue', parseFloat(e.target.value) || 0)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="1000"
              />
              <select
                value={formData.fuelSourceUnit}
                onChange={(e) => updateField('fuelSourceUnit', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Unit</option>
                <option value="btu">BTU</option>
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="gallon">gallon</option>
              </select>
            </div>
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
          Next: Transport
        </button>
      </div>
    </div>
  );
}