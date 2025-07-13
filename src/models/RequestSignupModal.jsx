import React, { useState } from 'react';
import Modal from '../componets/Modal';
import Button from '../componets/Button';

export default function RequestSignupModal({ open, onClose }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const isFormValid = userName.trim() !== '' && email.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    // Handle request signup logic here
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-lg">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-t-xl p-6 -mt-8 -mx-8 mb-6">
          <h3 className="text-2xl font-bold text-white text-left">Request Signup</h3>
          <p className="text-white/90 text-sm mt-1 text-left">Request access to join the platform</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">User Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter your name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              type="submit"
              disabled={!isFormValid}
              className={!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Request Signup
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 