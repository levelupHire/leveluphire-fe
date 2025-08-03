import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const VideoTile = ({ who, isVideoOn, videoRef, onClick , isMute, children }) => (
  <div
    className="flex-1 h-full flex items-center justify-center bg-gray-800 relative border-4 transition-all duration-200 border-transparent"
    onClick={onClick}
    style={{ cursor: 'pointer', minWidth: 0 }}
  >
    {who === 'user' ? (
      isVideoOn ? (
        <video ref={videoRef} autoPlay playsInline muted={isMute} className="w-auto h-[80%] max-w-[90%] max-h-[90%] object-contain rounded-lg bg-black" />
      ) : (
        <div className="flex items-center justify-center w-32 h-32 bg-gray-700 rounded-full">
          <UserCircleIcon className="w-24 h-24 text-gray-400" />
        </div>
      )
    ) : (
      <div className="flex items-center justify-center w-auto h-[80%] max-w-[90%] max-h-[90%] rounded-lg">
        <img src="/assets/interview-1.svg" alt="interviewer" className="object-contain w-full h-full" />
      </div>
    )}
    <span className="absolute bottom-4 left-4 text-xs font-semibold bg-gray-900/80 text-white px-2 py-0.5 rounded">{who === 'user' ? 'You' : 'AI'}</span>
    {children && <div className="absolute inset-0 flex items-center justify-center pointer-events-none">{children}</div>}
  </div>
);

export default VideoTile; 