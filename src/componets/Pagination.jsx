import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, rowsPerPage }) => {
  // Always render the pagination bar

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  // Calculate range for details
  const start = (totalItems === 0) ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between mt-0 border-t border-gray-200 py-4 px-6 bg-white" aria-label="Pagination">
      <div className="text-sm text-gray-600 min-w-[120px]">
        Showing {start}-{end} of {totalItems}
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded-md border border-gray-300 mr-2 flex items-center ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'}`}
          aria-label="Previous"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        {getPageNumbers().map((page, idx) =>
          page === '...'
            ? <span key={idx} className="px-2 text-gray-400">...</span>
            : <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 rounded-md border border-gray-300 mx-1 ${page === currentPage ? 'bg-primary text-white border-primary' : 'text-gray-700 hover:bg-primary/10'}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded-md border border-gray-300 ml-2 flex items-center ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-primary/10'}`}
          aria-label="Next"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination; 