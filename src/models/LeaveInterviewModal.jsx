import React from 'react';
import Modal from '../componets/Modal';
import Button from '../componets/Button';

export default function LeaveInterviewModal({ open, onCancel, onLeave, children }) {
  return (
    <Modal open={open} onClose={onCancel}>
      <div className="w-full max-w-lg">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-t-xl p-6 -mt-8 -mx-8 mb-6">
          <h3 className="text-2xl font-bold text-white text-left">Leave Interview?</h3>
        </div>
        {/* Info and warning messages */}
        <div className="mb-2 flex items-center gap-2 bg-blue-50 border-l-4 border-blue-400 text-blue-800 px-4 py-3 rounded">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
          <span className="text-sm">Your progress will not be recorded if you leave now.</span>
        </div>
        <div className="mb-4 flex items-center gap-2 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 px-4 py-3 rounded">
          <svg className="w-6 h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" /></svg>
          <span className="text-sm">Are you sure you want to leave the interview? <b>This action cannot be undone.</b></span>
        </div>
        <div className="flex gap-3 pt-6">
          <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" fullWidth onClick={onLeave} className="bg-red-600 hover:bg-red-700 text-white">
            Leave
          </Button>
        </div>
      </div>
    </Modal>
  );
} 