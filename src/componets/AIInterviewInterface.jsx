import React, { useState, useEffect, useRef } from 'react';
import { FiMic, FiMicOff, FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import speechService from '../services/speechService';

const AIInterviewInterface = ({ 
  questions, 
  onComplete, 
  onQuestionChange,
  isSpeaking,
  setIsSpeaking 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    if (currentQuestion) {
      askQuestion(currentQuestion);
    }
  }, [currentQuestionIndex]);

  const askQuestion = (question) => {
    const questionText = showFollowUp && question.followUp 
      ? question.followUp 
      : question.question;
    
    setIsSpeaking(true);
    speechService.speak(questionText, () => {
      setIsSpeaking(false);
      // Start listening for user's answer after AI finishes speaking
      setTimeout(() => {
        startListening();
      }, 500);
    });
  };

  const startListening = () => {
    setIsListening(true);
    setUserAnswer('');
    
    speechService.startListening(
      (transcript) => {
        setUserAnswer(transcript);
      },
      (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const stopListening = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const handleNextQuestion = () => {
    // Save current answer
    const currentAnswer = {
      question: currentQuestion.question,
      followUp: currentQuestion.followUp,
      userAnswer: userAnswer,
      category: currentQuestion.category
    };
    
    setAnswers(prev => [...prev, currentAnswer]);
    
    if (showFollowUp) {
      // Move to next question
      if (isLastQuestion) {
        // Interview complete
        const finalAnswers = [...answers, currentAnswer];
        onComplete(finalAnswers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowFollowUp(false);
        setUserAnswer('');
      }
    } else if (currentQuestion.followUp) {
      // Show follow-up question
      setShowFollowUp(true);
      setUserAnswer('');
    } else {
      // Move to next question
      if (isLastQuestion) {
        // Interview complete
        const finalAnswers = [...answers, currentAnswer];
        onComplete(finalAnswers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setUserAnswer('');
      }
    }
  };

  const handleSkipQuestion = () => {
    const currentAnswer = {
      question: currentQuestion.question,
      followUp: currentQuestion.followUp,
      userAnswer: '',
      category: currentQuestion.category
    };
    
    setAnswers(prev => [...prev, currentAnswer]);
    
    if (isLastQuestion) {
      onComplete([...answers, currentAnswer]);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFollowUp(false);
      setUserAnswer('');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      speechService.stopSpeaking();
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      // Resume speaking
      if (currentQuestion) {
        askQuestion(currentQuestion);
      }
    } else {
      // Pause speaking
      speechService.stopSpeaking();
    }
  };

  const replayQuestion = () => {
    if (currentQuestion) {
      askQuestion(currentQuestion);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Question Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* AI Avatar */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg border-4 border-white/30">
            <img src='/assets/interview-1.svg' alt='AI Avatar' className='w-12 h-12 object-contain' />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-2xl w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/40">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {showFollowUp && currentQuestion.followUp 
                  ? currentQuestion.followUp 
                  : currentQuestion.question}
              </h3>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {currentQuestion.category}
              </div>
            </div>

            {/* User Answer Display */}
            {userAnswer && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 mb-1">Your Answer:</p>
                <p className="text-gray-800 font-medium">{userAnswer}</p>
              </div>
            )}

            {/* Listening Indicator */}
            {isListening && (
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">Listening...</span>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-sm text-gray-600">Speak your answer now</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-center gap-4">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full transition-all duration-200 ${
              isMuted ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            title={isMuted ? 'Unmute AI' : 'Mute AI'}
          >
            {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
          </button>

          {/* Pause/Resume Button */}
          <button
            onClick={togglePause}
            className={`p-3 rounded-full transition-all duration-200 ${
              isPaused ? 'bg-yellow-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <FiPlay size={20} /> : <FiPause size={20} />}
          </button>

          {/* Replay Question */}
          <button
            onClick={replayQuestion}
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
            title="Replay Question"
          >
            <FiPlay size={20} />
          </button>

          {/* Voice Recognition Button */}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-4 rounded-full transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            title={isListening ? 'Stop Recording' : 'Start Recording'}
          >
            {isListening ? <FiMicOff size={24} /> : <FiMic size={24} />}
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkipQuestion}
            className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
            title="Skip Question"
          >
            Skip
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextQuestion}
            disabled={!userAnswer && !isListening}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              userAnswer || isListening
                ? 'bg-white text-blue-600 hover:bg-gray-100'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            {isLastQuestion && (showFollowUp || !currentQuestion.followUp) ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewInterface; 