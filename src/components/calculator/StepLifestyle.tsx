interface StepLifestyleProps {
  formData: any;
  updateField: (field: string, value: any) => void;
  onCalculate: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function StepLifestyle({ formData, updateField, onCalculate, onBack, loading }: StepLifestyleProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Diet Type
        </label>
        <select
          value={formData.dietType}
          onChange={(e) => updateField('dietType', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="low-meat">Low Meat</option>
          <option value="medium-meat">Medium Meat</option>
          <option value="high-meat">High Meat</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shopping Frequency
        </label>
        <select
          value={formData.shoppingFrequency}
          onChange={(e) => updateField('shoppingFrequency', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="minimal">Minimal (rarely shop online)</option>
          <option value="average">Average (monthly shopping)</option>
          <option value="frequent">Frequent (weekly shopping)</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
        >
          Back
        </button>
        <button
          onClick={onCalculate}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:bg-gray-400"
        >
          {loading ? 'Calculating...' : 'Calculate CO₂'}
        </button>
      </div>
    </div>
  );
}