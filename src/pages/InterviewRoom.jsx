import React, { useRef, useEffect, useState } from 'react';
import { FiMessageCircle, FiMoreHorizontal, FiPhoneOff, FiMic, FiVideo, FiMicOff, FiVideoOff } from 'react-icons/fi';
import { HiOutlineSpeakerWave } from 'react-icons/hi2';
import Modal from '../componets/Modal';
import { useNavigate } from 'react-router-dom';
import LeaveInterviewModal from '../models/LeaveInterviewModal';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Chat from '../componets/Chat';

const AI_AVATAR_TILE = (
  <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="24" r="14" fill="#6366F1"/>
      <ellipse cx="32" cy="48" rx="14" ry="8" fill="#6366F1"/>
      <ellipse cx="26" cy="22" rx="2.5" ry="3.5" fill="#fff"/>
      <ellipse cx="38" cy="22" rx="2.5" ry="3.5" fill="#fff"/>
    </svg>
  </div>
);

const InterviewRoom = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null); // To keep the stream reference
  const [shuffled, setShuffled] = useState(false);
  const [active, setActive] = useState('user'); // 'user' or 'ai'
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        // Handle error or show fallback
      });
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Ensure video element always gets the stream when video is toggled on
  useEffect(() => {
    if (isVideoOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isVideoOn]);

  // Handlers for mute/unmute and video on/off
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

  // Main video tile (active)
  const mainTile = (who) => (
    <div
      className={`flex-1 h-full flex items-center justify-center bg-gray-800 relative border-4 transition-all duration-200 border-transparent`}
      onClick={() => setActive(who)}
      style={{ cursor: 'pointer', minWidth: 0 }}
    >
      {who === 'user' ? (
        isVideoOn ? (
          <video ref={videoRef} autoPlay playsInline className="w-auto h-[80%] max-w-[90%] max-h-[90%] object-contain rounded-lg bg-black" />
        ) : (
          <div className="flex items-center justify-center w-32 h-32 bg-gray-700 rounded-full">
            <UserCircleIcon className="w-24 h-24 text-gray-400" />
          </div>
        )
      ) : (
        <div className="flex items-center justify-center w-32 h-32 bg-gray-700 rounded-full">
          {AI_AVATAR_TILE}
        </div>
      )}
      <span className="absolute bottom-4 left-4 text-xs font-semibold bg-gray-900/80 text-white px-2 py-0.5 rounded">{who === 'user' ? 'You' : 'AI'}</span>
    </div>
  );

  // Layout order: user always left, AI always right
  const left = 'user';
  const right = 'ai';

  return (
    <div className="relative w-full h-screen flex flex-col bg-gray-900">
      {/* Leave Confirmation Modal */}
      <LeaveInterviewModal
        open={showLeaveModal}
        onCancel={() => setShowLeaveModal(false)}
        onLeave={() => { setShowLeaveModal(false); navigate('/mock-interviews'); }}
      />
      {/* Top bar (header) with white background */}
      <div className="flex-none w-full flex items-center justify-between px-8 py-4 bg-gray-800 border-b border-white">
        <span className="text-lg font-bold text-white tracking-wide">Interview Room</span>
      </div>
      {/* Video area: full height/width, side by side, white background */}
      <div className="flex-1 flex flex-row w-full h-0 min-h-0 bg-white">
        {mainTile(left)}
        <div className="w-1 h-full self-stretch bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 shadow-lg" />
        {mainTile(right)}
      </div>
      {/* Modern Bottom Bar - full width, icons centered, blue gradient */}
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
      {/* Chat Panel */}
      <Chat open={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
};

export default InterviewRoom; 