import React from 'react';
import FeatureCard from '../componets/FeatureCard';
import Button from '../componets/Button';
import { AcademicCapIcon, BriefcaseIcon, ChartBarIcon, PlusCircleIcon, UserCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { aiStats } from '../constants/lists';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock user and progress data
const user = {
  name: 'Narendra Kumar',
  email: 'narendra@example.com',
  role: 'Frontend Developer',
  avatar: '', // Placeholder for avatar
};
const stats = [
  {
    icon: AcademicCapIcon,
    title: 'Practices Completed',
    value: 8,
    description: 'You have completed 8 practice sessions.'
  },
  {
    icon: BriefcaseIcon,
    title: 'Mock Interviews',
    value: 5,
    description: '5 mock interviews finished.'
  },
  {
    icon: ChartBarIcon,
    title: 'Progress',
    value: '80%',
    description: 'You are 80% ready for your next interview!'
  }
];

const recentActivity = [
  {
    name: 'Frontend Developer Interview',
    type: 'Interview',
    status: 'Completed',
    date: '2024-06-01',
    aiComment: 'Great communication and problem-solving.'
  },
  {
    name: 'System Design Practice',
    type: 'Practice',
    status: 'Completed',
    date: '2024-05-28',
    aiComment: 'Solid understanding of system components.'
  },
  {
    name: 'Behavioral Interview',
    type: 'Interview',
    status: 'Completed',
    date: '2024-05-20',
    aiComment: 'Strong leadership skills shown.'
  }
];

// Bar chart data (mocked for demo)
const barData = {
  labels: ['Practices', 'Mock Interviews', 'Progress'],
  datasets: [
    {
      label: 'Your Stats',
      data: [8, 5, 80],
      backgroundColor: [
        'rgba(99, 102, 241, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(251, 191, 36, 0.7)'
      ],
      borderRadius: 8,
      barThickness: 36,
    },
  ],
};
const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: { stepSize: 20 },
      grid: { color: '#f3f4f6' },
    },
    x: {
      grid: { display: false },
    },
  },
};

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-primary-light/10 via-white to-primary/5 h-full w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full h-full overflow-y-auto">
        {/* Top Welcome + Actions */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 w-full items-center justify-between">
          {/* Welcome Message */}
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-2xl md:text-3xl font-extrabold text-primary-dark mb-1">Welcome back, {user.name}!</span>
            <span className="text-primary text-base font-medium">Ready to level up your interview journey?</span>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3 w-full md:w-auto justify-end mt-4 md:mt-0">
            <Button variant="primary" className="text-sm flex items-center gap-2 px-4 py-2 min-w-[120px]">
              <PlusCircleIcon className="h-4 w-4" />
              New Practice
            </Button>
            <Button variant="secondary" className="text-sm flex items-center gap-2 px-4 py-2 min-w-[120px]">
              <BriefcaseIcon className="h-4 w-4" />
              Mock Interview
            </Button>
          </div>
        </div>

        {/* Stat Cards Row with subtle background */}
        <div className="rounded-2xl bg-gradient-to-r from-primary-light/5 via-white to-primary/10 p-4 md:p-6 mb-8 w-full flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col items-center min-w-0">
                <stat.icon className="h-7 w-7 text-primary mb-2" />
                <span className="text-2xl font-extrabold text-primary-dark mb-0.5">{stat.value}</span>
                <span className="text-base font-semibold text-primary mb-0.5">{stat.title}</span>
                <span className="text-gray-500 text-center text-xs">{stat.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center my-6">
          <span className="h-0.5 w-10 bg-primary-light rounded-full mx-2" />
          <span className="text-primary-dark font-bold text-xs tracking-widest uppercase">Your Progress</span>
          <span className="h-0.5 w-10 bg-primary-light rounded-full mx-2" />
        </div>

        {/* Chart and AI Stats Side by Side, always fill row */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 w-full">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow p-6 flex-1 min-w-0 flex flex-col items-center justify-center">
            <h2 className="text-lg font-bold text-primary-dark mb-4">Your Progress Overview</h2>
            <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
              <Bar data={barData} options={barOptions} />
            </div>
            <div className="mt-6 text-xs text-gray-500 text-center max-w-xs">Track your journey and see how close you are to your next milestone. Keep practicing and watch your stats grow!</div>
          </div>
          {/* AI Stats */}
          <div className="bg-white rounded-2xl shadow p-6 flex-1 min-w-0 flex flex-col items-center justify-center">
            <h2 className="text-lg font-bold text-primary-dark mb-4">AI Insights & Success</h2>
            <div className="grid grid-cols-2 gap-6 w-full">
              {aiStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-primary mb-1">{stat.value}</span>
                  <span className="text-primary-dark font-semibold text-center text-xs">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xs text-gray-500 text-center max-w-xs">Our AI has helped thousands of users boost their confidence and land jobs. You're in good company!</div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center my-6">
          <span className="h-0.5 w-10 bg-primary-light rounded-full mx-2" />
          <span className="text-primary-dark font-bold text-xs tracking-widest uppercase">Recent Activity</span>
          <span className="h-0.5 w-10 bg-primary-light rounded-full mx-2" />
        </div>

        {/* Recent Activity */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-primary-dark">Recent Activity</h2>
            <Button variant="outline" className="text-xs px-4 py-1.5 font-semibold border-primary text-primary hover:bg-primary-light/10">
              View All
            </Button>
          </div>
          <div className="bg-white rounded-2xl shadow overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivity.map((item, i) => (
                  <tr key={i} className="hover:bg-primary-light/10 transition-colors">
                    <td className="px-4 py-3 align-middle text-sm text-gray-900 font-semibold">{item.name}</td>
                    <td className="px-4 py-3 align-middle">
                      <span className="inline-block text-xs font-semibold rounded-full px-2 py-1 bg-primary-light/10 text-primary-dark">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-sm text-gray-700">{item.date}</td>
                    <td className="px-4 py-3 align-middle text-sm text-gray-800">{item.aiComment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}