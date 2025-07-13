import React, { useState, useEffect } from 'react';
import Modal from '../componets/Modal';
import Button from '../componets/Button';

export default function AddPracticeModal({ open, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Theory',
    level: 'Easy',
    questionNumber: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if form is valid
  useEffect(() => {
    const isValid = formData.name.trim() !== '' && 
                   formData.questionNumber !== '' && 
                   parseInt(formData.questionNumber) > 0;
    setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new practice object
    const newPractice = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      type: formData.type,
      status: 'Pending',
      progress: 0,
      questionNumber: parseInt(formData.questionNumber),
      currentQuestion: 0,
      level: formData.level,
    };

    onAdd(newPractice);
    
    // Reset form
    setFormData({
      name: '',
      type: 'Theory',
      level: 'Easy',
      questionNumber: '',
    });
    
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-lg">
        {/* Modern Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-t-xl p-6 -mt-8 -mx-8 mb-6">
          <h3 className="text-2xl font-bold text-white text-left">Add New Practice</h3>
          <p className="text-white/90 text-sm mt-1 text-left">Create a new practice session for your interview preparation</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Practice Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter practice name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Type</label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Theory">Theory</option>
              <option value="Code">Code</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Level</label>
            <select
              name="level"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Number of Questions</label>
            <input
              type="number"
              name="questionNumber"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter number of questions"
              value={formData.questionNumber}
              onChange={handleChange}
              min="1"
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
              Add Practice
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 