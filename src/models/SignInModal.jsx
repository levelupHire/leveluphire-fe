import React, { useState } from 'react';
import Modal from '../componets/Modal';
import Button from '../componets/Button';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function SignInModal({ open, onClose }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const isFormValid = loginId.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    dispatch(login());
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-lg">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-t-xl p-6 -mt-8 -mx-8 mb-6">
          <h3 className="text-2xl font-bold text-white text-left">Sign In</h3>
          <p className="text-white/90 text-sm mt-1 text-left">Sign in to access your dashboard and interview tools</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Login ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter your login ID"
              value={loginId}
              onChange={e => setLoginId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 