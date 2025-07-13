import React, { useState } from 'react';
import FeatureCard from '../componets/FeatureCard';
import StepCard from '../componets/StepCard';
import Button from '../componets/Button';
import SignInModal from '../models/SignInModal';
import RequestSignupModal from '../models/RequestSignupModal';
import { heroBenefits, aiFeatures, extraCards, aiStats, aiSteps } from '../constants/lists';
import { AcademicCapIcon, CodeBracketIcon, BriefcaseIcon, CheckCircleIcon, ChatBubbleLeftRightIcon, ChartBarIcon } from '@heroicons/react/24/outline';


export default function LandingPage() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AcademicCapIcon className="h-8 w-8 text-primary" />
            <span className="font-extrabold text-2xl text-primary-dark tracking-tight">LevelUp<span className="text-primary-light">Hire</span></span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-sm px-4 py-1.5" onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button variant="primary" className="text-sm px-4 py-1.5" onClick={() => setOpenRequest(true)}>Request Signup</Button>
          </div>
        </div>
      </header>

      {/* Hero Section - More Visually Attractive, Same Content */}
      <section className="relative flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-32 w-full text-center">
        {/* Enhanced animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-15%] top-[-25%] w-[500px] h-[500px] bg-gradient-to-br from-primary-light via-primary to-primary-dark opacity-20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute right-[-10%] bottom-[-20%] w-96 h-96 bg-primary-dark opacity-10 rounded-full blur-2xl animate-pulse animation-delay-2000" />
          <div className="absolute left-1/2 top-1/2 w-2/3 h-2/3 bg-gradient-to-tr from-primary/10 to-primary-light/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <span className="inline-block bg-primary-light/20 text-primary-dark font-semibold px-4 py-1 rounded-full mb-4 tracking-wide">Your Path to Job-Readiness Starts Here</span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary-dark mb-4 leading-tight drop-shadow">Level Up. Stand Out. Get Hired.</h1>
        <p className="text-xl md:text-2xl text-primary mb-6 font-semibold">The all-in-one platform for mastering interviews, building skills, and landing your dream job.</p>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          LevelUpHire is more than just practice—it's a complete journey. Access interactive theory, real coding challenges, and mock interviews that feel like the real thing. Get instant feedback, track your growth, and join a vibrant community of learners and mentors.
        </p>
        <div className="mb-6">
          <span className="inline-block bg-primary/10 text-primary-dark px-3 py-1 rounded-full text-sm font-medium">Now with AI-powered mock interviews & personalized feedback</span>
        </div>
        <ul className="flex flex-col sm:flex-row gap-4 justify-center">
          {heroBenefits.map((benefit, i) => (
            <li key={i} className="flex items-center gap-2 bg-white/70 rounded-lg px-4 py-2 transition">
              <benefit.icon className="h-6 w-6 text-primary" />
              <span className="text-primary-dark font-medium text-sm">{benefit.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What Makes Our AI Unique? (white bg, full width) */}
      <section className="py-20 px-0 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-4">What Makes Our AI Unique?</h2>
          <p className="text-center text-primary-dark mb-12 max-w-2xl mx-auto">LevelUpHire’s AI is built by engineers and hiring managers. It adapts to your needs, gives real feedback, and helps you grow with every session.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {aiFeatures.map((card, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl">
                <card.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-primary-dark mb-2">{card.title}</h3>
                <p className="text-black text-base">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unlock More with LevelUpHire (modernized, gradient bg, card shadow, border, hover) */}
      <section className="py-20 px-0 w-full bg-gradient-to-r from-primary-light via-blue-100 to-primary/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-primary-dark text-center mb-4">Unlock More with LevelUpHire</h2>
          <p className="text-center text-primary-dark/80 mb-12 max-w-2xl mx-auto">We’re more than just a practice platform. Discover features designed to accelerate your growth and connect you with opportunity.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {extraCards.map((card, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 bg-white/90 rounded-2xl shadow-md border border-primary/10 transition-transform duration-200 hover:scale-105 hover:shadow-xl"
              >
                <card.icon className="h-12 w-12 text-primary-dark mb-4" />
                <h3 className="text-xl font-bold text-primary-dark mb-2">{card.title}</h3>
                <p className="text-gray-700 text-base">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights & Success (white bg, full width) */}
      <section className="py-20 px-0 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-4">AI Insights & Success</h2>
          <p className="text-center text-primary-dark mb-12 max-w-2xl mx-auto">See how our AI is making a difference for job seekers worldwide.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aiStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center bg-white rounded-2xl p-8">
                <span className="text-3xl font-extrabold text-primary mb-2">{stat.value}</span>
                <span className="text-primary-dark font-semibold text-center text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Our AI Works (modernized, gradient bg) */}
      <section className="py-20 px-0 w-full bg-gradient-to-r from-primary-light via-blue-100 to-primary/20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-4">How Our AI Works</h2>
          <p className="text-center text-primary-dark mb-12 max-w-2xl mx-auto">From resume to report, our AI guides you every step of the way.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {aiSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl">
                <step.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-bold text-primary-dark mb-2">{step.title}</h3>
                <p className="text-black text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - improved content (no borders, no shadows) */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Why Choose LevelUpHire?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">We go beyond practice. Our platform blends real-world interview simulation, skill tracking, and a supportive community to help you stand out in today’s job market. Get personalized feedback, track your progress, and access resources curated by industry experts.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={CodeBracketIcon}
            title="Practice: Theory & Coding"
            description="Master both foundational concepts and real coding challenges with our curated practice sets."
          />
          <FeatureCard
            icon={BriefcaseIcon}
            title="Mock Interviews"
            description="Simulate real interviews—both technical and behavioral—to build confidence and readiness."
          />
          <FeatureCard
            icon={ChartBarIcon}
            title="Track & Improve"
            description="Get instant feedback, monitor your progress, and focus on areas that matter most."
          />
        </div>
      </section>

      {/* How It Works Section - more attractive (no borders, no shadows) */}
      <section className="py-20 px-4 bg-gray-100" id="how-it-works">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">How It Works</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Our 3-step process is designed to build your confidence and skills, so you’re ready for any interview. Practice, simulate, and succeed—one step at a time.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <StepCard
            icon={CodeBracketIcon}
            title="1. Practice"
            description="Start with interactive theory and coding exercises tailored to your goals."
          />
          <StepCard
            icon={ChatBubbleLeftRightIcon}
            title="2. Mock Interviews"
            description="Experience realistic interviews and receive constructive feedback."
          />
          <StepCard
            icon={CheckCircleIcon}
            title="3. Get Job-Ready"
            description="Refine your skills, track your growth, and approach your job search with confidence."
          />
        </div>
      </section>

      {/* Footer / Call to Action */}
      <footer className="bg-primary-dark text-white py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 flex items-center space-x-2">
            <AcademicCapIcon className="h-6 w-6 text-primary-light" />
            <span className="font-bold text-xl">LevelUp<span className="text-primary-light">Hire</span></span>
          </div>
          <div className="flex space-x-6">
            <a href="#about" className="hover:text-primary-light transition">About</a>
            <a href="#contact" className="hover:text-primary-light transition">Contact</a>
            <a href="#privacy" className="hover:text-primary-light transition">Privacy</a>
          </div>
        </div>
        <div className="text-center text-sm text-primary-light mt-4">Powered by AI &copy; {new Date().getFullYear()} LevelUpHire. All rights reserved.</div>
      </footer>

      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
      <RequestSignupModal open={openRequest} onClose={() => setOpenRequest(false)} />
    </div>
  );
}