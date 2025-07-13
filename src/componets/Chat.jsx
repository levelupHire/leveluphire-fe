import React, { useRef, useState } from 'react';

const Chat = ({ open, onClose }) => {
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const panelRef = useRef(null);
  const [input, setInput] = useState("");

  // Drag logic
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.clientX);
    setCurrentX(0);
    document.body.style.userSelect = 'none';
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (dx < 0) setCurrentX(dx); // Only allow dragging left
  };
  const handleMouseUp = () => {
    setDragging(false);
    setCurrentX(0);
    document.body.style.userSelect = '';
  };
  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  // Animation and glassmorphism styles
  const glassStyle = {
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(16px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    borderRadius: '1.5rem',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    border: '1px solid rgba(255,255,255,0.18)',
  };

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none ${open ? '' : 'hidden'}`}
      style={{ transition: 'background 0.5s cubic-bezier(0.4,0,0.2,1)', background: open ? 'rgba(0,0,0,0.18)' : 'transparent' }}
    >
      <div
        ref={panelRef}
        className={`absolute top-0 right-0 h-full w-full max-w-sm flex flex-col pointer-events-auto select-none`}
        style={{
          ...glassStyle,
          transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: `translateX(${open ? (dragging ? Math.min(0, currentX) : 0) : 384}px) scale(${dragging ? 0.98 : 1})`, // 384px = 24rem
          opacity: open ? 1 : 0,
        }}
      >
        {/* Drag handle */}
        <div
          className="w-full h-7 cursor-ew-resize flex items-center justify-center bg-white/30 border-b border-white/30 rounded-t-2xl"
          onMouseDown={handleMouseDown}
        >
          <div className="w-14 h-1.5 bg-gradient-to-r from-primary-light to-primary rounded-full" />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/30 bg-white/20 rounded-t-2xl">
          <span className="font-extrabold text-xl text-primary-dark tracking-wide drop-shadow">Chat</span>
          <button onClick={onClose} className="text-gray-400 hover:text-primary text-3xl font-bold focus:outline-none transition-all">&times;</button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white/10 rounded-b-2xl">
          {/* Example messages */}
          <div className="flex flex-col items-start">
            <div className="bg-gradient-to-r from-primary-light to-primary text-white px-5 py-3 rounded-2xl mb-1 max-w-xs shadow-md">Hi! How can I help you?</div>
            <span className="text-xs text-gray-400 ml-2">AI</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="bg-white/80 text-gray-900 px-5 py-3 rounded-2xl mb-1 max-w-xs shadow">I have a question about the interview.</div>
            <span className="text-xs text-gray-400 mr-2">You</span>
          </div>
        </div>
        {/* Input */}
        <form
          className="p-4 border-t border-white/30 bg-white/30 rounded-b-2xl flex gap-2 shadow-inner"
          onSubmit={e => {
            e.preventDefault();
            // Optionally handle sending message here
            setInput("");
          }}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary bg-white/70 text-gray-900 placeholder-gray-400 shadow"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition-transform">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 