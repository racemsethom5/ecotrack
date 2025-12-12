'use client';

import { useState } from 'react';

interface EmissionsListProps {
  records: any[];
  onViewDetails: (record: any) => void;
}

export default function EmissionsList({ records, onViewDetails }: EmissionsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(records.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecords = records.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRecords.map((record) => (
          <div
            key={record._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">
                {new Date(record.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <button
                onClick={() => onViewDetails(record)}
                className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
              >
                <span>Details</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-3">
              {record.totalEmissionsKg.toFixed(0)} kg
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>🏠 Household</span>
                <span className="font-medium">{record.breakdown.household.toFixed(0)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>⚡ Energy</span>
                <span className="font-medium">{record.breakdown.energy.toFixed(0)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>🚗 Transport</span>
                <span className="font-medium">{record.breakdown.transportation.toFixed(0)} kg</span>
              </div>
              <div className="flex justify-between">
                <span>🍔 Lifestyle</span>
                <span className="font-medium">{record.breakdown.lifestyle.toFixed(0)} kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Next
          </button>
        </div>
      )}

      {/* Pagination Info */}
      <div className="text-center text-sm text-gray-600">
        Showing {startIndex + 1}-{Math.min(endIndex, records.length)} of {records.length} calculations
      </div>
    </div>
  );
}