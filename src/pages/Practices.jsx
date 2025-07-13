import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../componets/Button';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import  {getStatusColor,getLevelColor,getLevelIcon,getProgressColor,getTypeIcon} from '../utils/commonStyles'
import Pagination from '../componets/Pagination';
import AddPracticeModal from '../models/AddPracticeModal';

const Practices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowsPerPage = 5;

  // Mock data for practices
  const [practices, setPractices] = useState([
    {
      id: 1,
      name: 'Frontend Developer Interview',
      type: 'Code',
      status: 'Active',
      progress: 75,
      questionNumber: 25,
      currentQuestion: 18,
      level: 'Medium',
    },
    {
      id: 2,
      name: 'System Design Practice',
      type: 'Theory',
      status: 'Completed',
      progress: 100,
      questionNumber: 15,
      currentQuestion: 15,
      level: 'Hard',
    },
    {
      id: 3,
      name: 'Behavioral Questions',
      type: 'Theory',
      status: 'Active',
      progress: 45,
      questionNumber: 20,
      currentQuestion: 9,
      level: 'Easy',
    },
    {
      id: 4,
      name: 'Data Structures & Algorithms',
      type: 'Code',
      status: 'Pending',
      progress: 0,
      questionNumber: 30,
      currentQuestion: 0,
      level: 'Hard',
    },
  ]);

  const handleDelete = (id) => {
    setPractices(practices.filter(practice => practice.id !== id));
  };

  const handleView = (id) => {
    const practice = practices.find(p => p.id === id);
    if (practice) {
      if (practice.type === 'Theory') {
        navigate(`/theory/${id}`);
      } else if (practice.type === 'Code') {
        navigate(`/code/${id}`);
      } else {
        navigate(`/practice/${id}`);
      }
    }
  };

  const handleAddPractice = (newPractice) => {
    setPractices(prev => [newPractice, ...prev]);
  };

  const filteredPractices = practices.filter(practice => {
    const matchesSearch = practice.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || practice.type === filterType;
    const matchesStatus = filterStatus === 'all' || practice.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const paginatedPractices = filteredPractices.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredPractices.length / rowsPerPage);

  // Reset to first page if filters/search change
  React.useEffect(() => { setCurrentPage(1); }, [searchTerm, filterType, filterStatus]);


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Practices</h1>
        <Button 
          variant="primary" 
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Practice
        </Button>
      </div>

      {/* Combined Search, Filter and Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden min-h-[570px] flex flex-col justify-between">
        {/* Search and Filter Header */}
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
                  placeholder="Search practices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3">
              {/* Type Filter */}
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="all">All Types</option>
                  <option value="Theory">Theory</option>
                  <option value="Code">Code</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedPractices.map((practice, index) => (
                <tr 
                  key={practice.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleView(practice.id)}
                >
                  <td className="px-6 py-4 align-middle text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 align-middle max-w-xs truncate">
                    <span className="text-sm font-medium text-gray-900 truncate block">{practice.name}</span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(practice.type)}
                      <span className="text-sm text-gray-900 truncate max-w-[100px]">{practice.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(practice.level)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(practice.level)}`}>{practice.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span className="text-sm text-gray-900">{practice.currentQuestion}/{practice.questionNumber}</span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(practice.status)}`}>{practice.status}</span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div className={`h-2 rounded-full ${getProgressColor(practice.progress)}`} style={{ width: `${practice.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-900">{practice.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(practice.id)}
                        className="text-red-600 hover:bg-red-100 rounded-full p-2 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
          totalItems={filteredPractices.length}
          rowsPerPage={rowsPerPage}
        />
        {filteredPractices.length === 0 && (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No practices found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
      
      {/* Add Practice Modal */}
      <AddPracticeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPractice}
      />
    </div>
  );
};

export default Practices; 