import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiPause, FiClock, FiCode, FiTarget, FiCheck, FiX, FiPlayCircle } from 'react-icons/fi';
import Button from '../componets/Button';
import { getLevelColor, getLevelIcon, getTypeIcon } from '../utils/commonStyles';

const CodePlayground = () => {
  const { practiceId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [practice, setPractice] = useState(null);
  const [codeInput, setCodeInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Mock code practice data
  const getMockCodePractice = (id) => {
    const practices = {
      '4': {
        id: '4',
        name: 'Data Structures & Algorithms',
        type: 'Code',
        level: 'Hard',
        questionNumber: 3,
        currentQuestion: 0,
        questions: [
          {
            id: 1,
            question: 'Implement a function to reverse a string in JavaScript.',
            type: 'code',
            language: 'javascript',
            explanation: `function reverseString(str) {
  return str.split('').reverse().join('');
}

// Alternative approach using a loop:
function reverseStringLoop(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}`,
            testCases: [
              { input: '"hello"', output: '"olleh"' },
              { input: '"world"', output: '"dlrow"' },
              { input: '""', output: '""' }
            ],
            starterCode: `function reverseString(str) {
  // Write your code here
  return str;
}`,
            description: 'Write a function that takes a string as input and returns the reversed string. The function should handle empty strings and preserve the original string.'
          },
          {
            id: 2,
            question: 'Write a function to check if a string is a palindrome.',
            type: 'code',
            language: 'javascript',
            explanation: `function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}

// Alternative approach using two pointers:
function isPalindromeTwoPointers(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleanStr.length - 1;
  
  while (left < right) {
    if (cleanStr[left] !== cleanStr[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
            testCases: [
              { input: '"racecar"', output: 'true' },
              { input: '"hello"', output: 'false' },
              { input: '"A man, a plan, a canal: Panama"', output: 'true' }
            ],
            starterCode: `function isPalindrome(str) {
  // Write your code here
  return false;
}`,
            description: 'A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward, ignoring spaces, punctuation, and capitalization.'
          },
          {
            id: 3,
            question: 'Implement a function to find the maximum element in an array.',
            type: 'code',
            language: 'javascript',
            explanation: `function findMax(arr) {
  if (arr.length === 0) return null;
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Using Math.max:
function findMaxMath(arr) {
  return Math.max(...arr);
}

// Using reduce:
function findMaxReduce(arr) {
  return arr.reduce((max, current) => 
    current > max ? current : max, arr[0]
  );
}`,
            testCases: [
              { input: '[1, 5, 3, 9, 2]', output: '9' },
              { input: '[-1, -5, -3]', output: '-1' },
              { input: '[42]', output: '42' }
            ],
            starterCode: `function findMax(arr) {
  // Write your code here
  return 0;
}`,
            description: 'Write a function that takes an array of numbers and returns the maximum value. Handle edge cases like empty arrays.'
          }
        ]
      }
    };
    
    return practices[id] || practices['4'];
  };

  const mockPractice = getMockCodePractice(practiceId);

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

  const handleShowSolution = () => {
    setShowSolution(true);
    setIsTimerRunning(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < practice.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowSolution(false);
      setCodeInput('');
      setOutput('');
      setIsTimerRunning(true);
      setTimer(0);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowSolution(false);
      setCodeInput('');
      setOutput('');
      setIsTimerRunning(true);
      setTimer(0);
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const runCode = () => {
    setIsRunning(true);
    try {
      // Simple code execution simulation
      const currentQuestion = practice.questions[currentQuestionIndex];
      const testResults = currentQuestion.testCases.map(testCase => {
        try {
          // This is a simplified execution - in a real app you'd use a proper code execution service
          const result = `Test case: ${testCase.input} → Expected: ${testCase.output}`;
          return { ...testCase, result, passed: true };
        } catch (error) {
          return { ...testCase, result: `Error: ${error.message}`, passed: false };
        }
      });
      setOutput(testResults.map(t => t.result).join('\n'));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    setIsRunning(false);
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
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 flex-shrink-0">
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
      <div className="px-4 py-3 flex-1 min-h-0 overflow-y-auto" style={{maxHeight: 'calc(100vh - 56px)'}}>
        {/* Progress Section */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <FiCode className="w-4 h-4 text-primary" />
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left Column - Question and Code Editor */}
          <div className="space-y-4">
            {/* Question Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4">
                <h2 className="text-base font-bold text-gray-900 leading-relaxed mb-2">
                  {currentQuestion.question}
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {currentQuestion.description}
                </p>
              </div>
            </div>
            {/* Code Editor */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-white px-4 py-2 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiCode className="w-4 h-4 text-primary" />
                    <span className="text-gray-900 font-medium text-sm">Code Editor</span>
                  </div>
                  <span className="text-gray-500 text-xs">{currentQuestion.language || 'JavaScript'}</span>
                </div>
              </div>
              <div className="p-4">
                <textarea
                  className="w-full h-48 bg-white text-gray-900 p-3 rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border border-gray-200"
                  placeholder="// Write your code here..."
                  value={codeInput || currentQuestion.starterCode}
                  onChange={(e) => setCodeInput(e.target.value)}
                  disabled={showSolution}
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="primary"
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 text-sm px-4 py-1.5"
                  >
                    <FiPlayCircle className="w-4 h-4" />
                    {isRunning ? 'Running...' : 'Run Code'}
                  </Button>
                  {!showSolution && (
                    <Button
                      variant="outline"
                      onClick={handleShowSolution}
                      className="text-sm px-4 py-1.5"
                    >
                      Show Solution
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Output and Solution */}
          <div className="space-y-4">
            {/* Output Console */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <h3 className="text-gray-900 font-medium text-sm">Output</h3>
              </div>
              <div className="p-4">
                <pre className="text-gray-800 font-mono text-sm whitespace-pre-wrap min-h-[80px]">
                  {output || '// Output will appear here when you run your code'}
                </pre>
              </div>
            </div>
            {/* Test Cases */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <h3 className="text-gray-900 font-medium text-sm">Test Cases</h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {currentQuestion.testCases.map((testCase, index) => (
                    <div key={index} className="bg-gray-100 rounded p-2">
                      <div className="text-sm text-gray-800">
                        <span className="font-medium">Input:</span> 
                        <code className="bg-gray-200 px-2 py-0.5 rounded ml-2 text-primary">{testCase.input}</code>
                      </div>
                      <div className="text-sm text-gray-800 mt-0.5">
                        <span className="font-medium">Expected Output:</span> 
                        <code className="bg-gray-200 px-2 py-0.5 rounded ml-2 text-blue-600">{testCase.output}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Solution */}
            {showSolution && (
              <div className="bg-green-50 rounded-lg border border-green-200 shadow-sm overflow-hidden">
                <div className="bg-green-100 px-4 py-2 border-b border-green-200">
                  <h3 className="text-green-900 font-medium flex items-center gap-2 text-sm">
                    <FiCheck className="w-4 h-4" />
                    Solution
                  </h3>
                </div>
                <div className="p-4">
                  <pre className="text-green-800 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                    {currentQuestion.explanation}
                  </pre>
                </div>
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
            <Button
              variant="primary"
              onClick={handleNextQuestion}
              disabled={isLastQuestion}
              className="text-sm px-5 py-1.5"
            >
              {isLastQuestion ? 'Finish Practice' : 'Next Question'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground; 