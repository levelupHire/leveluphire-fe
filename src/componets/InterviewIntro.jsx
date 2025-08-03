import React from 'react';
import Button from './Button';

const rules = [
  'Be ready with your webcam and microphone.',
  'You will be interviewed by an AI interviewer.',
  'Answer each question clearly and concisely.',
  'You can use the chat for clarifications.',
  'Click "Leave" to exit the interview at any time.',
  'The interview will be recorded for review.'
];

const InterviewIntro = ({ onStart }) => (
  <section className="relative w-full h-screen flex  bg-gray-800 overflow-hidden">
    <div className="absolute inset-0 bg-gray-800 pointer-events-none" />
    <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 pt-28 pb-12 md:py-20 gap-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-3">Welcome to Your Mock Interview</h1>
      <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-4 drop-shadow">
        Get ready to experience a realistic, AI-powered interview simulation. Practice your skills, get instant feedback, and boost your confidence for the real thing!
      </p>
      <div className="w-full flex flex-col items-center justify-center gap-6 mt-2">
        <ul className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto justify-center">
          {rules.map((rule, idx) => (
            <li key={idx} className="flex items-center gap-3 text-white/90 text-sm md:text-base bg-white/10 rounded-xl px-3 py-2 shadow-md backdrop-blur-md min-w-[150px] max-w-xs md:max-w-none">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white font-bold text-xs shadow-lg">
                {idx+1}
              </span>
              <span className="text-left">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button variant="primary" fullWidth onClick={onStart} className="mt-6 max-w-xs text-base py-2.5 shadow-xl">Start Interview</Button>
    </div>
  </section>
);

export default InterviewIntro; 