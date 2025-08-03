import { useState, useEffect } from 'react';
import { getRandomQuestions } from '../constants/questions';

export const useInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [interviewResults, setInterviewResults] = useState(null);

  const startInterview = (questionCount = 5) => {
    const interviewQuestions = getRandomQuestions(questionCount);
    setQuestions(interviewQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsInterviewComplete(false);
    setInterviewResults(null);
  };

  const addAnswer = (answer) => {
    setAnswers(prev => [...prev, answer]);
  };

  const completeInterview = () => {
    setIsInterviewComplete(true);
    setInterviewResults({
      answers: answers,
      totalQuestions: questions.length,
      answeredQuestions: answers.filter(a => a.userAnswer.trim().length > 0).length,
      timestamp: new Date().toISOString()
    });
  };

  const resetInterview = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsInterviewComplete(false);
    setInterviewResults(null);
  };

  return {
    questions,
    currentQuestionIndex,
    answers,
    isInterviewComplete,
    interviewResults,
    startInterview,
    addAnswer,
    completeInterview,
    resetInterview,
    setCurrentQuestionIndex
  };
}; 