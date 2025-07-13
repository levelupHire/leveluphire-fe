import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../componets/Header';
import Sidebar from '../componets/Sidebar';

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 min-h-0 h-full flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 