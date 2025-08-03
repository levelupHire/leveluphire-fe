import React, { useRef, useEffect, useState } from 'react';
import { FiMessageCircle, FiMoreHorizontal, FiPhoneOff, FiMic, FiVideo, FiMicOff, FiVideoOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import LeaveInterviewModal from '../models/LeaveInterviewModal';
import Chat from '../componets/Chat';
import VideoTile from '../componets/VideoTile';
import InterviewIntro from '../componets/InterviewIntro';
import AIInterviewInterface from '../componets/AIInterviewInterface';
import InterviewResults from '../componets/InterviewResults';
import { getRandomQuestions } from '../constants/questions';

const InterviewRoom = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [shuffled, setShuffled] = useState(false);
  const [active, setActive] = useState('user');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [started, setStarted] = useState(false);
  const [showAIIntro, setShowAIIntro] = useState(false);
  const [aiIntroDone, setAIIntroDone] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [interviewResults, setInterviewResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!started) return;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
      });
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (isVideoOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isVideoOn, started]);

  useEffect(() => {
    if (started && !aiIntroDone) {
      setShowAIIntro(true);
      // AI introduction speech
      const utter = new window.SpeechSynthesisUtterance(
        "Hello, my self sun. Shall we start the interview now?"
      );
      window.speechSynthesis.speak(utter);
    }
  }, [started, aiIntroDone]);

  const handleStartInterview = () => {
    setShowAIIntro(false);
    setAIIntroDone(true);
    setInterviewStarted(true);
    // Generate random questions for the interview
    const interviewQuestions = getRandomQuestions(5);
    setQuestions(interviewQuestions);
  };

  const handleInterviewComplete = (answers) => {
    setInterviewResults({ answers });
    setShowResults(true);
  };

  const handleRetryInterview = () => {
    setShowResults(false);
    setInterviewResults(null);
    setInterviewStarted(true);
    const interviewQuestions = getRandomQuestions(5);
    setQuestions(interviewQuestions);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setInterviewResults(null);
    setInterviewStarted(false);
    setStarted(false);
    setAIIntroDone(false);
  };

  const handleToggleAudio = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsAudioOn(track.enabled);
      });
    }
  };

  const handleToggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
        setIsVideoOn(track.enabled);
      });
    }
  };
  return (
    <div className="relative w-full h-full flex flex-col bg-gray-900">
      <LeaveInterviewModal
        open={showLeaveModal}
        onCancel={() => setShowLeaveModal(false)}
        onLeave={() => { setShowLeaveModal(false); navigate('/mock-interviews'); }}
      />
      <div className="flex-none w-full flex items-center justify-between px-8 py-4 bg-gray-800 border-b border-white">
        <span className="text-lg font-bold text-white tracking-wide">Interview Room</span>
      </div>
      {!started ? (
        <InterviewIntro onStart={() => setStarted(true)} />
      ) : (
        <>
          <div className="flex-1 flex flex-row w-full h-0 min-h-0 bg-white overflow-y-auto">
            <div className="flex-[2] flex items-center justify-center bg-gray-800 relative border-4 transition-all duration-200 border-transparent">
              {showAIIntro && !aiIntroDone && (
                <div className="flex flex-col items-center justify-center w-full max-h-[400px] py-8 pointer-events-auto animate-fade-in-up">
                  {/* AI Avatar/Icon */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg border-4 border-white/30">
                      <img src='/assets/interview-1.svg' alt='AI Avatar' className='w-10 h-10 object-contain' />
                    </div>
                  </div>
                  {/* Glassmorphism Card */}
                  <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl shadow-2xl px-8 py-6 mb-6 max-w-md text-gray-900 text-lg font-medium text-center" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
                    <span className="block text-blue-900/80 font-semibold mb-2 tracking-wide">AI Interviewer</span>
                    Hello, my self sun.<br/>Shall we start the interview now?
                  </div>
                  <button
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-8"
                    onClick={handleStartInterview}
                  >
                    Start
                  </button>
                </div>
              )}
              {interviewStarted && questions.length > 0 && (
                <AIInterviewInterface
                  questions={questions}
                  onComplete={handleInterviewComplete}
                  isSpeaking={isSpeaking}
                  setIsSpeaking={setIsSpeaking}
                />
              )}
            </div>
            <div className="w-1 h-full bg-white" />
            <div className="flex-[1] flex flex-col justify-between items-center bg-gray-800 relative border-4 transition-all duration-200 border-transparent">
              {/* User video at top */}
              <div className="flex items-center justify-center w-full" style={{height: '48%'}}>
                {isVideoOn ? (
                  <video ref={videoRef} autoPlay playsInline muted={true} className="w-auto h-[90%] max-w-[90%] max-h-[90%] object-contain rounded-lg bg-black" />
                ) : (
                  <div className="flex items-center justify-center w-32 h-32 bg-gray-700 rounded-full mt-8">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-24 h-24 text-gray-400'><path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118A7.5 7.5 0 0112 15.75a7.5 7.5 0 017.5 4.368M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
                  </div>
                )}
                <span className="absolute top-4 left-4 text-xs font-semibold bg-gray-900/80 text-white px-2 py-0.5 rounded">You</span>
              </div>
              {/* Border between user and AI video blocks */}
              <div className="w-full flex justify-center items-center">
                <div className="w-full border-t-2 border-white-400 my-1" />
              </div>
              {/* AI image at bottom */}
              <div className="flex items-center justify-center w-full" style={{height: '48%'}}>
                <img src="/assets/interview-1.svg" alt="interviewer" className="object-contain w-full h-full max-h-40" />
                <span className="absolute bottom-4 left-4 text-xs font-semibold bg-gray-900/80 text-white px-2 py-0.5 rounded">AI</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gradient-to-r from-primary-dark to-primary-light border-t border-blue-300">
            <div className="flex flex-row items-center justify-center gap-6 px-10 py-4">
              <button className="flex flex-col items-center justify-center w-12 h-12 rounded-full shadow bg-white/10 transition hover:scale-105 hover:shadow-lg focus:outline-none" title="Chat" onClick={() => setShowChat(true)}>
                <FiMessageCircle className="w-5 h-5 text-white mb-0.5" />
              </button>
              <button className="flex flex-col items-center justify-center w-12 h-12 rounded-full shadow bg-white/10 transition hover:scale-105 hover:shadow-lg focus:outline-none" title="Audio" onClick={handleToggleAudio}>
                {isAudioOn ? (
                  <FiMic className="w-5 h-5 mb-0.5 text-white" />
                ) : (
                  <FiMicOff className="w-5 h-5 mb-0.5 text-red-500 opacity-70" />
                )}
                <span className="sr-only">{isAudioOn ? 'Mute' : 'Unmute'}</span>
              </button>
              <button className="flex flex-col items-center justify-center w-12 h-12 rounded-full shadow bg-white/10 transition hover:scale-105 hover:shadow-lg focus:outline-none" title="Video" onClick={handleToggleVideo}>
                {isVideoOn ? (
                  <FiVideo className="w-5 h-5 mb-0.5 text-white" />
                ) : (
                  <FiVideoOff className="w-5 h-5 mb-0.5 text-red-500 opacity-70" />
                )}
                <span className="sr-only">{isVideoOn ? 'Turn Video Off' : 'Turn Video On'}</span>
              </button>
              <button className="flex flex-col items-center justify-center w-12 h-12 rounded-full shadow bg-white/10 transition hover:scale-105 hover:shadow-lg focus:outline-none" title="More Options">
                <FiMoreHorizontal className="w-5 h-5 text-white mb-0.5" />
              </button>
              <button className="flex flex-col items-center justify-center w-12 h-12 rounded-full shadow bg-red-600 transition hover:scale-105 hover:shadow-lg focus:outline-none" title="Leave Interview" onClick={() => setShowLeaveModal(true)}>
                <FiPhoneOff className="w-5 h-5 text-white mb-0.5" />
              </button>
            </div>
          </div>
          <Chat open={showChat} onClose={() => setShowChat(false)} />
        </>
      )}
      
      {/* Interview Results Modal */}
      {showResults && interviewResults && (
        <InterviewResults
          results={interviewResults}
          onClose={handleCloseResults}
          onRetry={handleRetryInterview}
        />
      )}
    </div>
  );
};

export default InterviewRoom; 