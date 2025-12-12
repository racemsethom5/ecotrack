'use client';

interface DetailsModalProps {
  record: any;
  onClose: () => void;
}

export default function DetailsModal({ record, onClose }: DetailsModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Calculation Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {new Date(record.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center bg-green-50 rounded-xl p-6">
            <div className="text-5xl font-bold text-green-600 mb-2">
              {record.totalEmissionsKg.toFixed(0)}
            </div>
            <div className="text-lg text-gray-600">kg CO₂ per year</div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-3">Breakdown by Category</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏠</div>
                  <div>
                    <div className="font-semibold text-gray-900">Household</div>
                    <div className="text-sm text-gray-600">Base emissions</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-green-600">
                  {record.breakdown.household.toFixed(0)} kg
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <div className="font-semibold text-gray-900">Energy</div>
                    <div className="text-sm text-gray-600">Electricity & fuel</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {record.breakdown.energy.toFixed(0)} kg
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🚗</div>
                  <div>
                    <div className="font-semibold text-gray-900">Transportation</div>
                    <div className="text-sm text-gray-600">Vehicle & flights</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-orange-600">
                  {record.breakdown.transportation.toFixed(0)} kg
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🍔</div>
                  <div>
                    <div className="font-semibold text-gray-900">Lifestyle</div>
                    <div className="text-sm text-gray-600">Diet & shopping</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-purple-600">
                  {record.breakdown.lifestyle.toFixed(0)} kg
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-3">Input Data</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Household Size:</span>
                <span className="font-medium text-gray-900">{record.householdSize} people</span>
              </div>
              {record.electricityData && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Electricity:</span>
                  <span className="font-medium text-gray-900">
                    {record.electricityData.electricity_value} {record.electricityData.electricity_unit}
                  </span>
                </div>
              )}
              {record.vehicleData && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle Distance:</span>
                  <span className="font-medium text-gray-900">
                    {record.vehicleData.distance_value} {record.vehicleData.distance_unit}
                  </span>
                </div>
              )}
              {record.flightsData && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Flights:</span>
                  <span className="font-medium text-gray-900">
                    {record.flightsData.passengers} passenger(s)
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Diet Type:</span>
                <span className="font-medium text-gray-900 capitalize">{record.dietType.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shopping Frequency:</span>
                <span className="font-medium text-gray-900 capitalize">{record.shoppingFrequency}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}