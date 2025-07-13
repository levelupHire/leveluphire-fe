import React from 'react';
import Modal from '../componets/Modal';
import Button from '../componets/Button';

export default function NotAttendedModal({ open, onClose, onSubmit, reason, setReason }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-lg">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-t-xl p-6 -mt-8 -mx-8 mb-6">
          <h3 className="text-2xl font-bold text-white text-left">Reason for Not Attending</h3>
          <p className="text-white/90 text-sm mt-1 text-left">Please provide a reason for not attending this interview</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Please provide a reason..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3 pt-6">
            <Button type="button" variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 