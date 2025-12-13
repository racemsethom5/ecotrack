'use client';

import AggregatedStats from '@/src/components/results/AggregatedStats';
import DetailsModal from '@/src/components/results/DetailsModal';
import EmissionsList from '@/src/components/results/EmissionsList';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function ResultsPage() {
  const router = useRouter();
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllRecords();
  }, []);

  const fetchAllRecords = async () => {
    try {
      const response = await fetch('/api/emissions/history');
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setAllRecords(data.data);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCalculator = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading dashboard...</div>
      </main>
    );
  }

  if (allRecords.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-700 mb-4">No calculations found</div>
          <p className="text-gray-600 mb-6">Start by calculating your carbon footprint</p>
          <button
            onClick={handleBackToCalculator}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go to Calculator
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              📊 Your CO₂ Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Complete analysis of all your carbon footprint calculations
            </p>
          </div>

          {/* Aggregated Stats and Charts */}
          <AggregatedStats records={allRecords} />

          {/* All Records Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                📜 All Calculations ({allRecords.length})
              </h2>
              <button
                onClick={handleBackToCalculator}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                + New Calculation
              </button>
            </div>
            
            <EmissionsList 
              records={allRecords} 
              onViewDetails={setSelectedRecord} 
            />
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRecord && (
        <DetailsModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </main>
  );
}