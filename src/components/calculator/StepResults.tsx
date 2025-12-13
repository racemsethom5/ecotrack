interface StepResultsProps {
  result: any;
  onReset: () => void;
}

export default function StepResults({ result, onReset }: StepResultsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Annual Carbon Footprint</h2>
        <div className="text-7xl font-bold text-green-600 mb-2">
          {result.totalEmissionsKg.toFixed(0)}
        </div>
        <p className="text-2xl text-gray-600">kg CO₂ per year</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-700">🏠 Household</span>
            <span className="font-semibold">{result.breakdown.household.toFixed(0)} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">⚡ Energy</span>
            <span className="font-semibold">{result.breakdown.energy.toFixed(0)} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">🚗 Transportation</span>
            <span className="font-semibold">{result.breakdown.transportation.toFixed(0)} kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">🍔 Lifestyle</span>
            <span className="font-semibold">{result.breakdown.lifestyle.toFixed(0)} kg</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-medium text-lg transition-colors"
        >
          Calculate Again
        </button>
        <button
          onClick={() => window.location.href = '/results'}
          className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium text-lg shadow-lg transition-colors"
        >
          📊 View Full Dashboard
        </button>
      </div>
    </div>
  );
}