import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-primary-dark to-primary-light text-white flex items-center justify-between px-8 h-20 shadow-lg z-20">
      <div className="flex items-center gap-3">
        <AcademicCapIcon className="h-9 w-9 text-white drop-shadow" />
        <span className="font-extrabold text-2xl tracking-tight">LevelUp<span className="text-primary-light">Hire</span></span>
      </div>
      <div className="flex items-center gap-4">
        {/* Placeholder for notifications or settings */}
        <button className="relative p-2 rounded-full hover:bg-primary-light/20 transition">
          <span className="sr-only">Notifications</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        {/* User avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-lg font-bold shadow-inner cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
} 