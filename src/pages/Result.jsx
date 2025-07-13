import React from 'react';
import Button from '../componets/Button';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';

const Result = () => {
  const navigate = useNavigate();
  // Mock data for demonstration
  const score = 4;
  const total = 5;
  const timeTaken = '03:25';

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-screen overflow-hidden bg-gradient-to-br from-primary-light/30 via-white to-primary/10">
      <div className="flex flex-col items-center justify-center w-full h-full px-2 py-4 md:py-8 flex-grow overflow-hidden">
        <div className="flex items-center justify-center mb-4">
          <span className="inline-flex items-center justify-center rounded-full bg-primary-light/20 p-4 shadow-lg animate-bounce">
            <SparklesIcon className="h-10 w-10 text-primary-dark drop-shadow" />
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-center text-primary-dark mb-1 drop-shadow">Congratulations!</h1>
        <p className="text-base text-primary mb-4 text-center font-semibold">You've completed your practice session.</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 w-full">
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-green-500 mb-1 drop-shadow-lg">{score}<span className="text-primary-dark">/{total}</span></span>
            <span className="text-sm text-gray-700 mb-0.5 font-medium">Correct Answers</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-primary-dark mb-1"><span className="inline-block align-middle"><svg className="inline w-5 h-5 text-primary-light mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg></span>{timeTaken}</span>
            <span className="text-sm text-gray-700 mb-0.5 font-medium">Time Taken</span>
          </div>
        </div>
        <div className="mb-6 w-full max-w-2xl mx-auto">
          <h2 className="text-lg font-bold text-primary-dark mb-1 text-center">Summary</h2>
          <ul className="list-none flex flex-col items-center gap-1 text-gray-700 text-sm">
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>Great job! You answered most questions correctly.</li>
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>Review the explanations for any incorrect answers.</li>
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>Keep practicing to improve your skills!</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
          <Button variant="primary" fullWidth onClick={() => navigate('/practice')} className="text-base py-2">Back to Practices</Button>
          <Button variant="outline" fullWidth onClick={() => navigate('/')} className="text-base py-2">Go to Dashboard</Button>
        </div>
        {/* Subtle Confetti (optional, can be replaced with a confetti library for real effect) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Example: Sparkles for celebration, can be replaced with a confetti effect */}
          <SparklesIcon className="absolute top-8 left-8 h-6 w-6 text-primary-light opacity-40 animate-spin-slow" />
          <SparklesIcon className="absolute bottom-8 right-8 h-6 w-6 text-primary-dark opacity-30 animate-spin-slow" />
          <SparklesIcon className="absolute top-1/2 left-1/4 h-4 w-4 text-primary opacity-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Result; 