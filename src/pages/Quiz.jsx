// src/pages/Quiz.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css";

const questions = [
  {
    q: "Which school subject do you enjoy the most?",
    options: [
      "Biology & Life Sciences 🧬",
      "Mathematics & Physics 🔢",
      "Business Studies & Economics 📊",
      "Humanities & Social Sciences 📚",
    ],
    map: ["biology", "engineering", "business", "arts"],
  },
  {
    q: "What kind of work environment excites you?",
    options: [
      "Hospitals or medical research labs, helping patients",
      "Tech companies, research labs, or engineering projects",
      "Corporate offices, financial institutions, or entrepreneurship",
      "Social work, education, or creative industries",
    ],
    map: ["biology", "engineering", "business", "arts"],
  },
  {
    q: "Which skill do you naturally excel in?",
    options: [
      "Understanding human anatomy and showing empathy",
      "Logical problem-solving and designing solutions",
      "Analyzing numbers, planning, and managing resources",
      "Communicating ideas, writing, or leadership",
    ],
    map: ["biology", "engineering", "business", "arts"],
  },
  {
    q: "What motivates you the most in your career?",
    options: [
      "Saving lives and contributing to healthcare",
      "Building technology that solves real-world problems",
      "Achieving financial success and business growth",
      "Making a social or cultural impact",
    ],
    map: ["biology", "engineering", "business", "arts"],
  },
  {
    q: "Which activity do you find most fulfilling?",
    options: [
      "Volunteering at health camps or studying diseases",
      "Building machines, coding, or experimenting with gadgets",
      "Managing events, internships in business, or trading stocks",
      "Engaging in debates, community service, or creative writing",
    ],
    map: ["biology", "engineering", "business", "arts"],
  },
];

// Career data
const careerPaths = {
  biology: {
    name: "Medical & Life Sciences",
    skills: ["Empathy & Care", "Scientific Analysis", "Problem Solving"],
    environments: [
      "Hospitals & Clinics",
      "Research Laboratories",
      "Healthcare Organizations",
    ],
    jobRoles: ["Doctor", "Biomedical Researcher", "Healthcare Administrator", "Pharmacist"],
    courses: ["MBBS", "B.Sc Biology", "Biotechnology", "Pharmacy"],
  },
  engineering: {
    name: "B.Tech – Engineering & Technology",
    skills: ["Problem-Solving", "Leadership Skill", "Logical Thinking"],
    environments: [
      "Tech and Software Companies",
      "Research and Development Organizations",
      "Infrastructure and Manufacturing Sector",
    ],
    jobRoles: ["Software Developer", "Data Scientist", "Cloud Engineer", "Cybersecurity Analyst"],
    courses: ["B.Tech CSE", "B.Tech Mechanical", "B.Tech Electronics", "B.Tech Civil"],
  },
  business: {
    name: "B.Com – Business & Commerce",
    skills: ["Analytical Skill", "Effective Communication Skill", "Financial Planning"],
    environments: [
      "Corporate Offices",
      "Financial Institutions",
      "Consulting Firms",
    ],
    jobRoles: ["Business Analyst", "Financial Manager", "Marketing Executive", "Entrepreneur"],
    courses: ["B.Com", "BBA", "Economics", "CA/CMA"],
  },
  arts: {
    name: "Arts – Creative & Social Sciences",
    skills: ["Creative Thinking", "Open-mindedness", "Communication"],
    environments: [
      "Educational Institutions",
      "Media Companies",
      "Social Organizations",
    ],
    jobRoles: ["Teacher", "Journalist", "Social Worker", "Content Creator"],
    courses: ["BA English", "BA Psychology", "Mass Communication", "Social Work"],
  },
};

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);

  const calculateResults = (allAnswers) => {
    const scores = { biology: 0, engineering: 0, business: 0, arts: 0 };

    allAnswers.forEach((ans, idx) => {
      const career = questions[idx].map[ans];
      scores[career] += 1;
    });

    const total = allAnswers.length;
    const updated = Object.keys(careerPaths).map((key) => {
      const percentage = total > 0 ? Math.round((scores[key] / total) * 100) : 0;
      return { ...careerPaths[key], key, match: percentage };
    });

    updated.sort((a, b) => b.match - a.match);

    return {
      topCareer: updated[0],
      allPaths: updated,
    };
  };

  const handleAnswerClick = (optionIndex) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const calculatedResults = calculateResults(newAnswers);
      setResults(calculatedResults);
      
      // Store results in localStorage for roadmap page
      localStorage.setItem('quizResults', JSON.stringify(calculatedResults));
      
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setQuizFinished(false);
    setAnswers([]);
    setResults(null);
    // Clear stored results
    localStorage.removeItem('quizResults');
  };

  if (!quizStarted) {
    return (
      <div className="quiz-page">
        <div className="quiz-intro">
          <img src="/assets/btech2-icon.png" alt="Quiz icon" className="quiz-intro-icon" />
          <h1>Career Discovery Quiz</h1>
          <p>
            Answer a few quick questions to find a personalized career and
            course path that aligns with your interests and strengths.
          </p>
          <button className="start-quiz-btn" onClick={() => setQuizStarted(true)}>
            Start the Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizFinished && results) {
    return (
      <div className="quiz-page">
        <div className="quiz-results">
          <h2>🎉 Assessment Complete!</h2>
          <p>Based on your responses, here are your top career matches:</p>

          <div className="results-summary">
            <h3>Your Best-Fit Career Path</h3>
            <div className="top-career-card">
              <h4>{results.topCareer.name}</h4>
              <div className="match-percentage">
                <span className="match-text">Match: {results.topCareer.match}%</span>
                <div className="match-bar">
                  <div
                    className="match-fill"
                    style={{ width: `${results.topCareer.match}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="all-matches">
            <h3>Top 3 Recommended Career Paths</h3>
            {results.allPaths.slice(0, 3).map((path, index) => (
              <div key={index} className="career-match-item">
                <div className="career-info">
                  <h4>{path.name}</h4>
                  <span className="match-score">Match = {path.match}%</span>
                </div>
                <div className="skills-list">
                  {path.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="results-actions">
            <Link to="/roadmap" className="generate-roadmap-btn">
              Generate Roadmap
            </Link>
            <button className="retry-btn" onClick={handleRestart}>
              Retake Quiz
            </button>
            <Link to="/courses" className="view-courses-btn">
              Search Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="question-header">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <h2 className="question-text">{currentQuestion.q}</h2>
        <div className="options-grid">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={`${currentQuestionIndex}-${idx}`} // Add unique key to reset component state
              className="option-button"
              onClick={() => handleAnswerClick(idx)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}