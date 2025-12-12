'use client';

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatsCard from './StatsCard';

interface AggregatedStatsProps {
  records: any[];
}

export default function AggregatedStats({ records }: AggregatedStatsProps) {
  const [chartView, setChartView] = useState<'trend' | 'comparison'>('trend');

  const totalEmissions = records.reduce((sum, r) => sum + r.totalEmissionsKg, 0);
  const averageEmissions = totalEmissions / records.length;
  const totalHousehold = records.reduce((sum, r) => sum + r.breakdown.household, 0);
  const totalEnergy = records.reduce((sum, r) => sum + r.breakdown.energy, 0);
  const totalTransport = records.reduce((sum, r) => sum + r.breakdown.transportation, 0);
  const totalLifestyle = records.reduce((sum, r) => sum + r.breakdown.lifestyle, 0);

  const trendData = [...records]
    .reverse()
    .map((record) => ({
      date: new Date(record.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: record.totalEmissionsKg,
      household: record.breakdown.household,
      energy: record.breakdown.energy,
      transportation: record.breakdown.transportation,
      lifestyle: record.breakdown.lifestyle,
    }));

  const categoryData = [
    { category: 'Household', value: totalHousehold, color: '#10b981' },
    { category: 'Energy', value: totalEnergy, color: '#3b82f6' },
    { category: 'Transportation', value: totalTransport, color: '#f59e0b' },
    { category: 'Lifestyle', value: totalLifestyle, color: '#8b5cf6' },
  ];

  const pieData = [
    { name: 'Household', value: totalHousehold, color: '#10b981' },
    { name: 'Energy', value: totalEnergy, color: '#3b82f6' },
    { name: 'Transportation', value: totalTransport, color: '#f59e0b' },
    { name: 'Lifestyle', value: totalLifestyle, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Emissions" value={totalEmissions} unit="kg" icon="🌍" color="bg-green-100" />
        <StatsCard title="Average per Calculation" value={averageEmissions} unit="kg" icon="📊" color="bg-blue-100" />
        <StatsCard title="Total Calculations" value={records.length} unit="" icon="🔢" color="bg-purple-100" />
        <StatsCard title="Latest" value={records[0].totalEmissionsKg} unit="kg" icon="⏰" color="bg-orange-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Total Emissions by Category</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => {
                  const percent = (entry.value / totalEmissions) * 100;
                  return `${entry.name}: ${percent.toFixed(0)}%`;
                }}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value.toFixed(0)} kg`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Category Totals</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium text-gray-900">Household</span>
              </div>
              <span className="text-xl font-bold text-green-600">{totalHousehold.toFixed(0)} kg</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="font-medium text-gray-900">Energy</span>
              </div>
              <span className="text-xl font-bold text-blue-600">{totalEnergy.toFixed(0)} kg</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="font-medium text-gray-900">Transportation</span>
              </div>
              <span className="text-xl font-bold text-orange-600">{totalTransport.toFixed(0)} kg</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="font-medium text-gray-900">Lifestyle</span>
              </div>
              <span className="text-xl font-bold text-purple-600">{totalLifestyle.toFixed(0)} kg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Emissions Analysis</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setChartView('trend')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartView === 'trend' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Trend Over Time
            </button>
            <button
              onClick={() => setChartView('comparison')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartView === 'comparison' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Category Comparison
            </button>
          </div>
        </div>

        {chartView === 'trend' && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value.toFixed(0)} kg`} />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} name="Total" />
              <Line type="monotone" dataKey="household" stroke="#10b981" strokeWidth={2} name="Household" />
              <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy" />
              <Line type="monotone" dataKey="transportation" stroke="#f59e0b" strokeWidth={2} name="Transportation" />
              <Line type="monotone" dataKey="lifestyle" stroke="#8b5cf6" strokeWidth={2} name="Lifestyle" />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartView === 'comparison' && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value.toFixed(0)} kg`} />
              <Legend />
              <Bar dataKey="value" fill="#10b981" name="Total Emissions" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}