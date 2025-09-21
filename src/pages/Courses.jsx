// src/pages/Courses.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Courses.css';

// Enhanced data for the course cards
const courseData = [
  {
    id: 'mbbs',
    icon: '/assets/mbbs-icon.png',
    name: 'M.B.B.S.',
    careers: 'Specialization (MD/MS), Diploma in ICU',
    shortDesc: 'Bachelor of Medicine, Bachelor of Surgery - The gateway to medical profession'
  },
  {
    id: 'btech',
    icon: '/assets/btech-icon.png',
    name: 'B.Tech',
    careers: 'Software Engineer, Cyber Security, Data Science',
    shortDesc: 'Bachelor of Technology - Engineering excellence for the modern world'
  },
  {
    id: 'bca',
    icon: '/assets/bca-icon.png',
    name: 'BCA',
    careers: 'M.Tech, GATE, Business, Placements',
    shortDesc: 'Bachelor of Computer Applications - Your journey into IT world'
  },
  {
    id: 'bcom',
    icon: '/assets/bcom-icon.png',
    name: 'B.Com',
    careers: 'Financial analyst(CA), Government Services, Management & MBA',
    shortDesc: 'Bachelor of Commerce - Foundation for business and finance careers'
  },
];

// Additional courses data for "More" section
const additionalCourses = [
  {
    id: 'ba',
    emoji: '📚',
    name: 'B.A.',
    careers: 'Civil Services, Teaching, Journalism, Law',
    shortDesc: 'Bachelor of Arts - Liberal arts education for diverse career paths'
  },
  {
    id: 'bsc',
    emoji: '🔬',
    name: 'B.Sc',
    careers: 'Research, Laboratory Technician, Teaching',
    shortDesc: 'Bachelor of Science - Scientific foundation for research and innovation'
  },
  {
    id: 'bba',
    emoji: '💼',
    name: 'B.B.A',
    careers: 'Business Manager, Entrepreneur, Marketing',
    shortDesc: 'Bachelor of Business Administration - Leadership in business world'
  },
  {
    id: 'sports',
    emoji: '⚽',
    name: 'Sports Science',
    careers: 'Sports Coach, Fitness Trainer, Sports Management',
    shortDesc: 'Sports and Physical Education - Career in sports and fitness industry'
  },
  {
    id: 'design',
    emoji: '🎨',
    name: 'Design',
    careers: 'Graphic Designer, UI/UX Designer, Fashion Designer',
    shortDesc: 'Creative Design Programs - Express your creativity professionally'
  },
  {
    id: 'hotel',
    emoji: '🏨',
    name: 'Hotel Management',
    careers: 'Hotel Manager, Event Manager, Tourism',
    shortDesc: 'Hospitality and Tourism - Service excellence in hospitality industry'
  }
];

export default function Courses() {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  const handleMoreClick = () => {
    setShowAllCourses(!showAllCourses);
  };

  return (
    <div className="courses-page">
      {/* --- Hero Section --- */}
      <section className="courses-hero">
        <div className="hero-text">
          <h1>Explore Career Options Based on Courses</h1>
          <p>
            Discover the right path with our interactive course-to-career mapper
          </p>
          <Link to="/quiz" className="cta-button">
            Take Career Quiz
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="/assets/student-with-laptop.png"
            alt="Student with laptop"
          />
        </div>
      </section>

      {/* --- Courses Grid Section --- */}
      <section className="courses-grid-section">
        <div className="courses-grid-header">
          <h2>Courses to Careers</h2>
          <p>Uncover the best career path with our interactive mapper</p>
        </div>
        
        <div className="courses-grid">
          {/* Map through the main course data to create clickable cards */}
          {courseData.map((course, index) => (
            <div 
              className="course-card clickable" 
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCourseClick(course.id);
                }
              }}
            >
              <div className="icon-container">
                <img src={course.icon} alt={`${course.name} icon`} />
              </div>
              <h3>{course.name}</h3>
              <p>{course.careers}</p>
              <div className="course-action">
                <span className="learn-more">Click to learn more →</span>
              </div>
            </div>
          ))}

          {/* "More" Card */}
          <div 
            className="more-card clickable" 
            onClick={handleMoreClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleMoreClick();
              }
            }}
          >
            <span>{showAllCourses ? 'SHOW LESS' : 'MORE..'}</span>
          </div>
        </div>

        {/* Additional Courses Section */}
        {showAllCourses && (
          <div className="additional-courses-section">
            <div className="courses-grid-header">
              <h2>Explore More Courses</h2>
              <p>Discover additional career paths and specializations</p>
            </div>
            <div className="courses-grid">
              {additionalCourses.map((course, index) => (
                <div 
                  className="course-card clickable additional-course" 
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCourseClick(course.id);
                    }
                  }}
                >
                  <div className="icon-container emoji-container">
                    <span className="course-emoji">{course.emoji}</span>
                  </div>
                  <h3>{course.name}</h3>
                  <p>{course.careers}</p>
                  <div className="course-action">
                    <span className="learn-more">Click to learn more →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}