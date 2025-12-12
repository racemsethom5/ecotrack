'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
  breakdown: {
    household: number;
    energy: number;
    transportation: number;
    lifestyle: number;
  };
}

export default function ComparisonChart({ breakdown }: ComparisonChartProps) {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const yearlyData = [
    { category: 'Household', value: breakdown.household },
    { category: 'Energy', value: breakdown.energy },
    { category: 'Transport', value: breakdown.transportation },
    { category: 'Lifestyle', value: breakdown.lifestyle },
  ];

  const monthlyData = yearlyData.map(item => ({
    ...item,
    value: item.value / 12,
  }));

  const data = period === 'yearly' ? yearlyData : monthlyData;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Emissions by Category</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === 'monthly'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === 'yearly'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value: number) => `${value.toFixed(0)} kg CO₂`} />
          <Legend />
          <Bar dataKey="value" fill="#10b981" name={`CO₂ Emissions (${period})`} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}