import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import Button from '../componets/Button';
import Pagination from '../componets/Pagination';

const mockProgressData = [
  {
    id: 1,
    name: 'Frontend Developer Interview',
    type: 'Interview',
    status: 'Completed',
    date: '2024-06-01',
    aiComment: 'Great communication and problem-solving.',
  },
  {
    id: 2,
    name: 'System Design Practice',
    type: 'Practice',
    status: 'Completed',
    date: '2024-05-28',
    aiComment: 'Solid understanding of system components.',
  },
  {
    id: 3,
    name: 'Behavioral Interview',
    type: 'Interview',
    status: 'Completed',
    date: '2024-05-20',
    aiComment: 'Strong leadership skills shown.',
  },
  {
    id: 4,
    name: 'DSA Practice',
    type: 'Practice',
    status: 'Completed',
    date: '2024-05-15',
    aiComment: 'Excellent algorithmic thinking.',
  },
];

const Progress = () => {
  // Only show completed items
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter and search logic
  const filteredResults = mockProgressData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const paginatedResults = filteredResults.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  // Reset to first page if filters/search change
  React.useEffect(() => { setCurrentPage(1); }, [searchTerm, filterType]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2 text-primary-dark">Your Results</h1>
      <p className="mb-6 text-gray-700">See your completed practices and interviews. Review your results and celebrate your progress!</p>
      {/* Search and Filter Header */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden min-h-[570px] flex flex-col justify-between">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search results..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            {/* Type Filter */}
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="all">All Types</option>
                  <option value="Interview">Interview</option>
                  <option value="Practice">Practice</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Comments</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedResults.length > 0 ? paginatedResults.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 align-middle text-sm text-gray-900">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                  <td className="px-6 py-4 align-middle max-w-xs truncate">
                    <span className="text-sm font-medium text-gray-900 truncate block">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span className="inline-block text-xs font-semibold rounded-full px-2 py-1 bg-primary-light/10 text-primary-dark">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span className="text-sm text-gray-700">{item.date}</span>
                  </td>
                  <td className="px-6 py-4 align-middle max-w-md truncate">
                    <span className="text-sm text-gray-800">{item.aiComment}</span>
                  </td>
                  <td className="px-6 py-4 align-middle text-center">
                      <EyeIcon className="w-5 h-5 text-primary-dark cursor-pointer" />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't completed any practices or interviews yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
          totalItems={filteredResults.length}
          rowsPerPage={rowsPerPage}
        />
      </div>
    </div>
  );
};

export default Progress; 