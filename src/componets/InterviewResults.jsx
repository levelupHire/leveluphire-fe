import React from 'react';
import { FiCheckCircle, FiXCircle, FiStar, FiTrendingUp, FiMessageCircle } from 'react-icons/fi';

const InterviewResults = ({ results, onClose, onRetry }) => {
  const calculateScore = () => {
    if (!results || !results.answers) return 0;
    const totalQuestions = results.answers.length;
    const answeredQuestions = results.answers.filter(answer => answer.userAnswer.trim().length > 0).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const getFeedback = (score) => {
    if (score >= 90) return { message: "Excellent! You demonstrated strong communication skills and technical knowledge.", color: "text-green-600" };
    if (score >= 70) return { message: "Good job! You showed solid understanding with room for improvement.", color: "text-blue-600" };
    if (score >= 50) return { message: "Fair performance. Focus on expanding your technical knowledge and communication.", color: "text-yellow-600" };
    return { message: "Keep practicing! Consider reviewing the basics and improving your communication skills.", color: "text-red-600" };
  };

  const score = calculateScore();
  const feedback = getFeedback(score);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Interview Results</h2>
              <p className="text-blue-100">Your performance analysis and feedback</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <FiXCircle size={24} />
            </button>
          </div>
        </div>

        {/* Score Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{score}%</span>
              </div>
              <div className="absolute -top-2 -right-2">
                <FiStar className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className={`text-xl font-semibold mb-2 ${feedback.color}`}>
              {feedback.message}
            </h3>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <FiTrendingUp className="text-green-500" />
                <span className="text-sm text-gray-600">Answered {results?.answers?.filter(a => a.userAnswer.trim().length > 0).length || 0} of {results?.answers?.length || 0} questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions and Answers */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FiMessageCircle className="text-blue-500" />
            Question & Answer Review
          </h3>
          
          <div className="space-y-6">
            {results?.answers?.map((qa, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {qa.question}
                    </h4>
                    {qa.followUp && (
                      <p className="text-gray-600 text-sm mb-3 italic">
                        Follow-up: {qa.followUp}
                      </p>
                    )}
                    <div className="bg-white rounded-md p-3 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 mb-1">Your Answer:</p>
                      <p className="text-gray-800">
                        {qa.userAnswer || (
                          <span className="text-gray-400 italic">No answer provided</span>
                        )}
                      </p>
                    </div>
                    {qa.userAnswer && (
                      <div className="flex items-center gap-2 mt-2">
                        <FiCheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-green-600">Answer recorded</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            Try Another Interview
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewResults; 