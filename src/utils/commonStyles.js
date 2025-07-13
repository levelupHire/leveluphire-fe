import { FiCode, FiBookOpen, FiSmile, FiMeh, FiFrown } from 'react-icons/fi';


export const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

export  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

export  const getLevelColor = (level) => {
    switch (level) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

export const getTypeIcon = (type) => {
    switch (type) {
      case 'Code':
        return <FiCode className="text-primary w-5 h-5" title="Code" />;
      case 'Theory':
        return <FiBookOpen className="text-blue-600 w-5 h-5" title="Theory" />;
      default:
        return null;
    }
  };

export  const getLevelIcon = (level) => {
    switch (level) {
      case 'Easy':
        return <FiSmile className="text-green-500 w-4 h-4" title="Easy" />;
      case 'Medium':
        return <FiMeh className="text-yellow-500 w-4 h-4" title="Medium" />;
      case 'Hard':
        return <FiFrown className="text-red-500 w-4 h-4" title="Hard" />;
      default:
        return null;
    }
  };