import React, { useState } from 'react';
import Button from '../componets/Button';
import { FiEye, FiTrash2, FiPlay, FiXCircle } from 'react-icons/fi';
import { getStatusColor, getLevelColor, getLevelIcon, getProgressColor, getTypeIcon } from '../utils/commonStyles';
import Pagination from '../componets/Pagination';
import AddMockInterviewModal from '../models/AddMockInterviewModal';
import NotAttendedModal from '../models/NotAttendedModal';
import { useNavigate } from 'react-router-dom';

const MockInterviews = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotAttendModalOpen, setIsNotAttendModalOpen] = useState(false);
  const [notAttendReason, setNotAttendReason] = useState('');
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);
  const rowsPerPage = 5;

  // Mock data for mock interviews
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      name: 'Frontend Mock Interview',
      currentQuestion: 6,
      level: 'Medium',
      interviewDate: '2024-06-01',
      interviewTime: '10:00',
    },
    {
      id: 2,
      name: 'System Design Mock',
      currentQuestion: 8,
      level: 'Hard',
      interviewDate: '2024-06-02',
      interviewTime: '14:00',
    },
    {
      id: 3,
      name: 'Behavioral Mock',
      currentQuestion: 4,
      level: 'Easy',
      interviewDate: '2024-06-03',
      interviewTime: '09:30',
    },
    {
      id: 4,
      name: 'DSA Mock',
      currentQuestion: 0,
      level: 'Hard',
      interviewDate: '2024-06-04',
      interviewTime: '16:00',
    },
  ]);

  const handleDelete = (id) => {
    setInterviews(interviews.filter(interview => interview.id !== id));
  };

  const handleView = (id) => {
    console.log('View interview:', id);
    // Add navigation or modal logic here
  };

  const handleAddInterview = (newInterview) => {
    setInterviews(prev => [newInterview, ...prev]);
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || interview.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const paginatedInterviews = filteredInterviews.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(filteredInterviews.length / rowsPerPage);

  // Reset to first page if filters/search change
  React.useEffect(() => { setCurrentPage(1); }, [searchTerm, filterStatus]);

  function handleStart(id) {
    // Navigate to the interview room
    navigate('/interview-room');
  }

  function handleNotAttend(id) {
    setSelectedInterviewId(id);
    setIsNotAttendModalOpen(true);
  }
  function handleNotAttendSubmit(e) {
    e.preventDefault();
    // TODO: Save or process the reason for not attending
    setIsNotAttendModalOpen(false);
    setNotAttendReason('');
    setSelectedInterviewId(null);
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mock Interviews</h1>
        <Button 
          variant="primary" 
          className="flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Mock Interview
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
                  placeholder="Search mock interviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedInterviews.map((interview, index) => (
                <tr key={interview.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 align-middle text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 align-middle max-w-xs truncate">
                    <span className="text-sm font-medium text-gray-900 truncate block">{interview.name}</span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(interview.level)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(interview.level)}`}>{interview.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span className="text-sm text-gray-900">{interview.interviewDate}</span>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span className="text-sm text-gray-900">{interview.interviewTime}</span>
                  </td>
                  <td className="px-6 py-4 align-middle flex justify-start gap-5">
                      <FiPlay 
                        className="w-5 h-5 cursor-pointer text-primary hover:text-primary-dark"
                        onClick={() => handleStart(interview.id)}
                      />
                      <FiXCircle 
                        className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-600"
                        onClick={() => handleNotAttend(interview.id)}
                      />
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
          totalItems={filteredInterviews.length}
          rowsPerPage={rowsPerPage}
        />
        {filteredInterviews.length === 0 && (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No mock interviews found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
      
      {/* Add Mock Interview Modal */}
      <AddMockInterviewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddInterview}
      />
      {/* Not Attended Modal */}
      <NotAttendedModal
        open={isNotAttendModalOpen}
        onClose={() => setIsNotAttendModalOpen(false)}
        onSubmit={handleNotAttendSubmit}
        reason={notAttendReason}
        setReason={setNotAttendReason}
      />
    </div>
  );
};

export default MockInterviews; 