'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BreakdownChartProps {
  data: {
    household: number;
    energy: number;
    transportation: number;
    lifestyle: number;
  };
}

export default function BreakdownChart({ data }: BreakdownChartProps) {
  const chartData = [
    { name: 'Household', value: data.household, color: '#10b981' },
    { name: 'Energy', value: data.energy, color: '#3b82f6' },
    { name: 'Transportation', value: data.transportation, color: '#f59e0b' },
    { name: 'Lifestyle', value: data.lifestyle, color: '#8b5cf6' },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Emissions Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: any) => {
              const percent = entry.percent || 0;
              return `${entry.name}: ${(percent * 100).toFixed(0)}%`;
            }}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toFixed(0)} kg`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}