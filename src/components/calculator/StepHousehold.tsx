interface StepHouseholdProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  onNext: () => void;
}

export default function StepHousehold({ formData, updateField, onNext }: StepHouseholdProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Household Size
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={formData.householdSize}
          onChange={(e) => updateField('householdSize', parseInt(e.target.value) || 1)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500 mt-1">Number of people in your household</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <select
          value={formData.country}
          onChange={(e) => updateField('country', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="DE">Germany</option>
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="FR">France</option>
          <option value="ES">Spain</option>
          <option value="IT">Italy</option>
        </select>
      </div>

      <button
        onClick={onNext}
        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
      >
        Next: Energy
      </button>
    </div>
  );
}