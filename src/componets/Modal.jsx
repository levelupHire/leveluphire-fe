import React from 'react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-primary text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {title && <h3 className="text-xl font-bold text-primary mb-6 text-center">{title}</h3>}
        {children}
      </div>
    </div>
  );
} 