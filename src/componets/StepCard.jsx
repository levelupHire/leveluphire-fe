import React from 'react';

export default function StepCard({ icon: Icon, title, description }) {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg">
        <Icon className="h-8 w-8 text-primary mb-2" />
        <h4 className="font-semibold text-primary-dark mb-1">{title}</h4>
        <p className="text-black text-sm">{description}</p>
      </div>
    );
  }