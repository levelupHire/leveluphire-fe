import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiX, FiPlay, FiPause, FiClock, FiBookOpen, FiTarget } from 'react-icons/fi';
import Button from '../componets/Button';
import { getLevelColor, getLevelIcon, getTypeIcon } from '../utils/commonStyles';

const TheoryPlayground = () => {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [practice, setPractice] = useState(null);
  const [textAnswer, setTextAnswer] = useState('');

  // Mock theory practice data
  const getMockTheoryPractice = (id) => {
    const practices = {
      '1': {
        id: '1',
        name: 'Frontend Developer Interview',
        type: 'Theory',
        level: 'Medium',
        questionNumber: 5,
        currentQuestion: 0,
        questions: [
          {
            id: 1,
            question: 'What is the difference between let, const, and var in JavaScript?',
            type: 'multiple_choice',
            options: [
              'let and const are block-scoped, var is function-scoped',
              'All three are function-scoped',
              'var and let are block-scoped, const is function-scoped',
              'There is no difference between them'
            ],
            correctAnswer: 0,
            explanation: 'let and const are block-scoped, meaning they are only accessible within the block they are declared in. var is function-scoped, meaning it is accessible throughout the entire function.'
          },
          {
            id: 2,
            question: 'Explain the concept of closures in JavaScript.',
            type: 'text',
            explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned. This allows the function to "remember" and access variables from its outer scope.'
          },
          {
            id: 3,
            question: 'What is the output of console.log(typeof null)?',
            type: 'multiple_choice',
            options: [
              'null',
              'undefined',
              'object',
              'number'
            ],
            correctAnswer: 2,
            explanation: 'typeof null returns "object" in JavaScript, which is considered a bug in the language. This is a well-known JavaScript quirk.'
          },
          {
            id: 4,
            question: 'What are the main differences between React and Vue.js?',
            type: 'text',
            explanation: 'React uses JSX and has a more flexible approach to component structure, while Vue uses templates and has a more opinionated structure. React has a larger ecosystem, while Vue is easier to learn for beginners.'
          },
          {
            id: 5,
            question: 'What is the purpose of the useEffect hook in React?',
            type: 'multiple_choice',
            options: [
              'To create side effects in functional components',
              'To replace class components',
              'To handle form submissions',
              'To manage state'
            ],
            correctAnswer: 0,
            explanation: 'useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.'
          }
        ]
      }
    };
    
    return practices[id] || practices['1'];
  };

  const mockPractice = getMockTheoryPractice(practiceId);

  useEffect(() => {
    setPractice(mockPractice);
  }, [practiceId]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
    setIsTimerRunning(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < practice.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTextAnswer('');
      setIsTimerRunning(true);
      setTimer(0);
    } else {
      console.log(">>>>>>")
      navigate('/practice/result');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTextAnswer('');
      setIsTimerRunning(true);
      setTimer(0);
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  if (!practice) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentQuestion = practice.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === practice.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/practice')}
                className="flex items-center gap-2 text-sm px-3 py-1.5"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back to Practices
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {getTypeIcon(practice.type)}
                  <span className="text-xs font-medium text-gray-700">{practice.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {getLevelIcon(practice.level)}
                  <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getLevelColor(practice.level)}`}>{practice.level}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                <button
                  onClick={toggleTimer}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {isTimerRunning ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
                </button>
                <FiClock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-mono font-medium text-gray-700">{formatTime(timer)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex-1 min-h-0 overflow-y-auto">
        {/* Progress Section */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <FiBookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-gray-900">
                  Question {currentQuestionIndex + 1} of {practice.questions.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiTarget className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">
                  {Math.round(((currentQuestionIndex + 1) / practice.questions.length) * 100)}% Complete
                </span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / practice.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        {/* Question Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-base font-bold text-gray-900 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>
            {currentQuestion.type === 'multiple_choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showAnswer && handleAnswerSelect(index)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    } ${
                      showAnswer
                        ? index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 shadow-sm'
                          : selectedAnswer === index && index !== currentQuestion.correctAnswer
                          ? 'border-red-500 bg-red-50 shadow-sm'
                          : 'border-gray-200'
                        : ''
                    }`}
                    disabled={showAnswer}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-900 text-sm">{option}</span>
                      {showAnswer && index === currentQuestion.correctAnswer && (
                        <FiCheck className="w-5 h-5 text-green-600 ml-auto" />
                      )}
                      {showAnswer && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <FiX className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {currentQuestion.type === 'text' && (
              <div className="space-y-4">
                <textarea
                  className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  placeholder="Type your detailed answer here..."
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  disabled={showAnswer}
                />
                {showAnswer && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-3">
                    <h4 className="font-bold text-blue-900 mb-2 text-sm">Explanation:</h4>
                    <p className="text-blue-800 leading-relaxed text-sm">{currentQuestion.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-3">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={isFirstQuestion}
            className={`flex items-center gap-1.5 text-sm px-4 py-1.5 ${isFirstQuestion ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            {!showAnswer ? (
              <Button
                variant="primary"
                onClick={handleSubmitAnswer}
                disabled={currentQuestion.type === 'multiple_choice' && selectedAnswer === null}
                className="text-sm px-5 py-1.5"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNextQuestion}
                className="text-sm px-5 py-1.5"
              >
                {isLastQuestion ? 'Finish Practice' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryPlayground; 