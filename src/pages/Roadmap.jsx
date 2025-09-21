// src/pages/Roadmap.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Roadmap.css';

// Dynamic roadmap data based on career paths
const roadmapData = {
  biology: {
    userData: {
      name: "Student",
      averageSalary: "₹12.0L",
      jobOffers: 6,
      growthProspect: "Good",
      keyMetrics: 5
    },
    careerJourney: {
      currentStep: "Class 12 (Science - PCB)",
      completedSteps: ["Complete Class 12 with Physics, Chemistry, Biology"],
      nextSteps: [
        {
          phase: "NEET Preparation",
          duration: "6-12 months",
          description: "Prepare for NEET exam for medical college admission",
          activities: ["Join coaching institute", "Practice mock tests", "Focus on Biology, Chemistry, Physics", "Solve previous year papers"]
        },
        {
          phase: "Medical Education",
          duration: "5.5 years (MBBS)",
          description: "Complete MBBS degree from recognized medical college",
          activities: ["Complete pre-clinical subjects", "Clinical rotations", "Internship program", "Specialize in preferred field"]
        },
        {
          phase: "Specialization",
          duration: "3 years (MD/MS)",
          description: "Pursue post-graduation in specialized medical field",
          activities: ["Choose specialization", "Complete residency", "Research work", "Clinical practice"]
        },
        {
          phase: "Medical Practice",
          duration: "Career launch",
          description: "Start independent practice or join healthcare institutions",
          activities: ["Medical license", "Join hospitals", "Private practice", "Continuous medical education"]
        }
      ]
    },
    skillsToevelop: [
      { skill: "Medical Knowledge", level: 50, target: 95 },
      { skill: "Patient Care & Empathy", level: 65, target: 90 },
      { skill: "Clinical Decision Making", level: 40, target: 88 },
      { skill: "Communication Skills", level: 60, target: 85 }
    ],
    jobRoles: [
      "General Physician",
      "Specialist Doctor",
      "Surgeon",
      "Medical Researcher",
      "Healthcare Administrator",
      "Public Health Officer"
    ],
    workEnvironments: [
      "Hospitals & Clinics",
      "Medical Research Centers",
      "Healthcare Organizations",
      "Government Health Departments"
    ]
  },
  engineering: {
    userData: {
      name: "Student",
      averageSalary: "₹8.0L",
      jobOffers: 5,
      growthProspect: "Good",
      keyMetrics: 4
    },
    careerJourney: {
      currentStep: "Class 12 (Science - PCM)",
      completedSteps: ["Complete Class 12 with Physics, Chemistry, Mathematics"],
      nextSteps: [
        {
          phase: "Entrance Preparation",
          duration: "6-12 months",
          description: "Prepare for JEE Main and Advanced for top engineering colleges",
          activities: ["Join coaching institute", "Practice mock tests", "Focus on PCM subjects", "Solve previous year papers"]
        },
        {
          phase: "B.Tech Admission",
          duration: "4 years",
          description: "Pursue Bachelor of Technology in your preferred specialization",
          activities: ["Choose Computer Science/IT specialization", "Maintain good academics", "Build programming skills", "Participate in technical events"]
        },
        {
          phase: "Skill Development",
          duration: "Throughout degree",
          description: "Develop industry-relevant technical and soft skills",
          activities: ["Learn programming languages", "Work on projects", "Internships", "Participate in hackathons"]
        },
        {
          phase: "Career Launch",
          duration: "Final year",
          description: "Secure placement or higher education opportunities",
          activities: ["Campus placements", "Build portfolio", "Network with professionals", "Consider MS abroad"]
        }
      ]
    },
    skillsToevelop: [
      { skill: "Analytical Skill", level: 60, target: 90 },
      { skill: "Teamwork and collaboration", level: 45, target: 85 },
      { skill: "Discipline", level: 70, target: 95 },
      { skill: "Perseverance", level: 55, target: 88 }
    ],
    jobRoles: [
      "Software Developer",
      "Data Scientist",
      "Cloud Engineer",
      "Cybersecurity Analyst",
      "AI/ML Engineer",
      "Full Stack Developer"
    ],
    workEnvironments: [
      "Tech and Software Companies",
      "Research and Development Organizations",
      "Infrastructure and Manufacturing Sector",
      "Startups and Innovation Labs"
    ]
  },
  business: {
    userData: {
      name: "Student",
      averageSalary: "₹7.5L",
      jobOffers: 4,
      growthProspect: "Very Good",
      keyMetrics: 4
    },
    careerJourney: {
      currentStep: "Class 12 (Commerce/Any Stream)",
      completedSteps: ["Complete Class 12 with good academic performance"],
      nextSteps: [
        {
          phase: "Business Education",
          duration: "3 years",
          description: "Pursue Bachelor's in Business Administration or Commerce",
          activities: ["Choose BBA/B.Com program", "Focus on business fundamentals", "Develop analytical skills", "Join business clubs"]
        },
        {
          phase: "Practical Experience",
          duration: "Throughout degree",
          description: "Gain real-world business experience through internships",
          activities: ["Summer internships", "Part-time jobs", "Business competitions", "Networking events"]
        },
        {
          phase: "Specialization",
          duration: "2 years (MBA/M.Com)",
          description: "Specialize in specific business domain",
          activities: ["Choose MBA specialization", "Case study analysis", "Industry projects", "Leadership roles"]
        },
        {
          phase: "Career Launch",
          duration: "Final year",
          description: "Secure positions in business and corporate sectors",
          activities: ["Campus placements", "Business plan development", "Professional certifications", "Entrepreneurship opportunities"]
        }
      ]
    },
    skillsToevelop: [
      { skill: "Financial Analysis", level: 55, target: 88 },
      { skill: "Communication & Presentation", level: 65, target: 92 },
      { skill: "Strategic Thinking", level: 50, target: 85 },
      { skill: "Leadership", level: 45, target: 90 }
    ],
    jobRoles: [
      "Business Analyst",
      "Financial Manager",
      "Marketing Executive",
      "Entrepreneur",
      "Investment Banker",
      "Management Consultant"
    ],
    workEnvironments: [
      "Corporate Offices",
      "Financial Institutions",
      "Consulting Firms",
      "Startups and Business Incubators"
    ]
  },
  arts: {
    userData: {
      name: "Student",
      averageSalary: "₹6.5L",
      jobOffers: 3,
      growthProspect: "Good",
      keyMetrics: 4
    },
    careerJourney: {
      currentStep: "Class 12 (Any Stream)",
      completedSteps: ["Complete Class 12 with focus on humanities/social sciences"],
      nextSteps: [
        {
          phase: "Liberal Arts Education",
          duration: "3 years",
          description: "Pursue Bachelor's in Arts or Humanities specialization",
          activities: ["Choose BA specialization", "Develop writing skills", "Critical thinking", "Cultural awareness"]
        },
        {
          phase: "Skill Building",
          duration: "Throughout degree",
          description: "Build creative and communication skills",
          activities: ["Creative writing", "Public speaking", "Social work", "Media production"]
        },
        {
          phase: "Advanced Studies",
          duration: "2 years (MA/MSW)",
          description: "Specialize in chosen field of humanities",
          activities: ["Research projects", "Thesis work", "Field experience", "Teaching opportunities"]
        },
        {
          phase: "Career Development",
          duration: "Final year",
          description: "Explore diverse career opportunities in creative and social sectors",
          activities: ["Portfolio development", "Freelancing", "Social initiatives", "Media internships"]
        }
      ]
    },
    skillsToevelop: [
      { skill: "Creative Writing", level: 60, target: 90 },
      { skill: "Critical Thinking", level: 55, target: 88 },
      { skill: "Cultural Awareness", level: 70, target: 85 },
      { skill: "Public Speaking", level: 45, target: 82 }
    ],
    jobRoles: [
      "Teacher/Professor",
      "Journalist",
      "Content Writer",
      "Social Worker",
      "Cultural Officer",
      "Media Producer"
    ],
    workEnvironments: [
      "Educational Institutions",
      "Media Companies",
      "Social Organizations",
      "Government Cultural Departments"
    ]
  }
};

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState('journey');
  const [careerData, setCareerData] = useState(null);

  useEffect(() => {
    // Get quiz results from localStorage
    const storedResults = localStorage.getItem('quizResults');
    
    if (storedResults) {
      const results = JSON.parse(storedResults);
      const topCareerKey = results.topCareer.key;
      setCareerData(roadmapData[topCareerKey] || roadmapData.engineering);
    } else {
      // Default to engineering if no quiz results found
      setCareerData(roadmapData.engineering);
    }
  }, []);

  // Show loading if data not loaded yet
  if (!careerData) {
    return (
      <div className="roadmap-page">
        <div className="journey-title">
          <h1>Loading your personalized roadmap...</h1>
        </div>
      </div>
    );
  }

  const { userData, careerJourney, skillsToevelop, jobRoles, workEnvironments } = careerData;

  return (
    <div className="roadmap-page">
      {/* Header Section */}
      <div className="roadmap-header">
        <div className="user-stats">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>{userData.averageSalary}</h3>
              <p>Average Salary</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{userData.jobOffers}</h3>
              <p>Job Offers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{userData.growthProspect}</h3>
              <p>Growth Prospects</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>{userData.keyMetrics}</h3>
              <p>Key Metrics</p>
            </div>
          </div>
        </div>
        
        <div className="journey-title">
          <h1>🚀 Your Personalized Career Journey</h1>
          <p>Based on your assessment results, here's your customized roadmap to success</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="roadmap-tabs">
        <button 
          className={`tab ${activeTab === 'journey' ? 'active' : ''}`}
          onClick={() => setActiveTab('journey')}
        >
          📈 Career Path
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          🎯 Skills to Develop
        </button>
        <button 
          className={`tab ${activeTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveTab('opportunities')}
        >
          💼 Job Opportunities
        </button>
      </div>

      {/* Content Sections */}
      <div className="roadmap-content">
        
        {/* Career Journey Tab */}
        {activeTab === 'journey' && (
          <div className="journey-section">
            <div className="current-status">
              <h2>📍 Current Status</h2>
              <div className="status-card completed">
                <div className="status-icon">✅</div>
                <div className="status-info">
                  <h3>{careerJourney.currentStep}</h3>
                  <p>You've completed this milestone!</p>
                </div>
              </div>
            </div>

            <div className="roadmap-timeline">
              <h2>🗺️ Your Roadmap Ahead</h2>
              {careerJourney.nextSteps.map((step, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker">{index + 1}</div>
                  <div className="timeline-content">
                    <div className="step-header">
                      <h3>{step.phase}</h3>
                      <span className="duration">{step.duration}</span>
                    </div>
                    <p className="step-description">{step.description}</p>
                    <div className="activities">
                      <h4>Key Activities:</h4>
                      <ul>
                        {step.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Development Tab */}
        {activeTab === 'skills' && (
          <div className="skills-section">
            <h2>🎯 Skills Development Plan</h2>
            <p className="skills-intro">
              Based on your career path, here are the key skills you should develop:
            </p>
            
            <div className="skills-grid">
              {skillsToevelop.map((skillItem, index) => (
                <div key={index} className="skill-card">
                  <h3>{skillItem.skill}</h3>
                  <div className="skill-progress">
                    <div className="progress-labels">
                      <span>Current: {skillItem.level}%</span>
                      <span>Target: {skillItem.target}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-current" 
                        style={{width: `${skillItem.level}%`}}
                      ></div>
                      <div 
                        className="progress-target" 
                        style={{width: `${skillItem.target}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="improvement-needed">
                    <span>Gap to close: {skillItem.target - skillItem.level}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="skill-tips">
              <h3>💡 How to Improve These Skills</h3>
              <div className="tips-grid">
                <div className="tip-card">
                  <h4>📚 Learning Resources</h4>
                  <p>Take online courses, read technical books, and join study groups</p>
                </div>
                <div className="tip-card">
                  <h4>🤝 Practice & Apply</h4>
                  <p>Work on real projects, collaborate with peers, and seek internships</p>
                </div>
                <div className="tip-card">
                  <h4>📈 Track Progress</h4>
                  <p>Set monthly goals, get feedback, and measure your improvement</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="opportunities-section">
            <div className="opportunities-overview">
              <h2>💼 Career Opportunities</h2>
              
              <div className="opportunities-grid">
                <div className="opp-card">
                  <h3>🏢 Work Environments</h3>
                  <ul className="environment-list">
                    {workEnvironments.map((env, index) => (
                      <li key={index}>{env}</li>
                    ))}
                  </ul>
                </div>

                <div className="opp-card">
                  <h3>🎯 Potential Job Roles</h3>
                  <div className="job-roles-grid">
                    {jobRoles.map((role, index) => (
                      <div key={index} className="job-role-tag">
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="market-insights">
              <h3>📊 Market Insights</h3>
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-number">85%</div>
                  <div className="insight-text">Job Market Growth</div>
                </div>
                <div className="insight-card">
                  <div className="insight-number">₹12L</div>
                  <div className="insight-text">Average Starting Salary</div>
                </div>
                <div className="insight-card">
                  <div className="insight-number">95%</div>
                  <div className="insight-text">Placement Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="roadmap-actions">
        <Link to="/courses" className="action-btn primary">
          🔍 Find Courses
        </Link>
        <Link to="/college" className="action-btn secondary">
          🏛️ Explore Colleges
        </Link>
        <button className="action-btn tertiary" onClick={() => window.print()}>
          📄 Download Roadmap
        </button>
      </div>
    </div>
  );
}