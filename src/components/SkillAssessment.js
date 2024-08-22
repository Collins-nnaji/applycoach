import React, { useState } from 'react';
import './SkillAssessment.css';

const mockQuestions = [
  {
    id: 1,
    question: "What is the output of console.log(typeof [])?",
    options: ["array", "object", "undefined", "null"],
    correctAnswer: "object"
  },
  {
    id: 2,
    question: "Which method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()"
  },
  // Add more questions as needed
];

const SkillAssessment = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const score = calculateScore();
      onComplete({ score, answers });
    }
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return (correct / mockQuestions.length) * 100;
  };

  const question = mockQuestions[currentQuestion];

  return (
    <div className="skill-assessment">
      <h2>Skill Assessment</h2>
      <p>{question.question}</p>
      <div className="options">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillAssessment;