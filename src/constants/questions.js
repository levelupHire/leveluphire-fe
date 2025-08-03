export const interviewQuestions = {
  behavioral: [
    {
      id: 1,
      category: 'behavioral',
      question: "Tell me about a time when you had to work under pressure to meet a deadline.",
      followUp: "What was the outcome and what did you learn from that experience?"
    },
    {
      id: 2,
      category: 'behavioral',
      question: "Describe a situation where you had to resolve a conflict with a team member.",
      followUp: "How did you approach the situation and what was the result?"
    },
    {
      id: 3,
      category: 'behavioral',
      question: "Can you give me an example of a project where you had to learn a new technology quickly?",
      followUp: "What challenges did you face and how did you overcome them?"
    },
    {
      id: 4,
      category: 'behavioral',
      question: "Tell me about a time when you had to explain a complex technical concept to a non-technical person.",
      followUp: "How did you ensure they understood the concept?"
    },
    {
      id: 5,
      category: 'behavioral',
      question: "Describe a situation where you had to make a difficult decision without all the information you needed.",
      followUp: "What was your decision-making process?"
    }
  ],
  technical: [
    {
      id: 6,
      category: 'technical',
      question: "Can you explain the difference between let, const, and var in JavaScript?",
      followUp: "When would you use each one?"
    },
    {
      id: 7,
      category: 'technical',
      question: "What is the difference between synchronous and asynchronous programming?",
      followUp: "Can you give an example of when you would use each?"
    },
    {
      id: 8,
      category: 'technical',
      question: "Explain the concept of closures in JavaScript.",
      followUp: "How have you used closures in your projects?"
    },
    {
      id: 9,
      category: 'technical',
      question: "What is the difference between REST and GraphQL?",
      followUp: "When would you choose one over the other?"
    },
    {
      id: 10,
      category: 'technical',
      question: "Can you explain what a promise is in JavaScript?",
      followUp: "How do you handle errors in promises?"
    }
  ],
  problemSolving: [
    {
      id: 11,
      category: 'problemSolving',
      question: "How would you design a system to handle millions of concurrent users?",
      followUp: "What are the main challenges you would consider?"
    },
    {
      id: 12,
      category: 'problemSolving',
      question: "If you had to optimize a slow-loading website, what steps would you take?",
      followUp: "What tools would you use to identify bottlenecks?"
    },
    {
      id: 13,
      category: 'problemSolving',
      question: "How would you implement a feature that allows users to upload and share files?",
      followUp: "What security considerations would you have in mind?"
    },
    {
      id: 14,
      category: 'problemSolving',
      question: "Describe how you would implement a real-time chat feature.",
      followUp: "What technologies would you use and why?"
    },
    {
      id: 15,
      category: 'problemSolving',
      question: "How would you approach debugging a production issue that only occurs for some users?",
      followUp: "What tools and strategies would you use?"
    }
  ]
};

export const getRandomQuestions = (count = 5) => {
  const allQuestions = [
    ...interviewQuestions.behavioral,
    ...interviewQuestions.technical,
    ...interviewQuestions.problemSolving
  ];
  
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getQuestionsByCategory = (category, count = 3) => {
  const questions = interviewQuestions[category] || [];
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 