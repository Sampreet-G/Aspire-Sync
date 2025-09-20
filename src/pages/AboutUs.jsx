// src/pages/AboutUs.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const teamMembers = [
  {
    id: 1,
    name: 'Oishani Chakraborty',
    role: 'Team Leader',
    image: '👩‍💼',
    bio: 'As our team leader, Oishani Chakraborty is the driving force behind our project. She\'s responsible for managing our overall vision, coordinating tasks, and ensuring we stay on track to deliver an outstanding solution.',
    specialties: ['Project Management', 'Team Leadership', 'Strategic Planning'],
    education: 'Computer Science and Engineering',
    contact: 'oishanichakraborty.cse2023@nsec.ac.in'
  },
  {
    id: 2,
    name: 'Sampreet Ghosh',
    role: 'Frontend and AI Developer',
    image: '👨‍💻',
    bio: 'Sampreet Ghosh is a talented third-year CSE student serving as the frontend and AI developer for our team. With a keen eye for design and a passion for creating seamless user experiences, he not only builds intuitive interfaces but also introduced AI integration into our project. As the driving force behind our web development, he is the main reason our vision has come to life on the web.',
    specialties: ['React.js', 'UI/UX Design', 'FrontEnd Development', 'AI Integration'],
    education: 'Computer Science and Engineering',
    contact: 'sampreetghosh.cse2023@nsec.ac.in'
  },
  {
    id: 3,
    name: 'Srizan Sutradhar',
    role: 'Backend Developer',
    image: '🎨',
    bio: 'Srizan Sutradhar is a versatile member of our team, handling both UI/UX design and backend development. He is responsible for crafting a seamless user experience while also building the robust server-side architecture that powers our application.',
    specialties: ['UI/UX Design', 'Backend Development', 'Server Architecture'],
    education: 'Computer Science and Engineering',
    contact: 'srizansutradhar.cse2023@nsec.ac.in'
  },
  {
    id: 4,
    name: 'Samyo Ghosh',
    role: 'AI/ML Research Specialist',
    image: '🤖',
    bio: 'Samyo Ghosh is responsible for the research work of integrating AI into the project. His expertise in artificial intelligence is key to developing the smart features for our solution.',
    specialties: ['AI/ML Research', 'AI Integration Research'],
    education: 'Computer Science and Engineering',
    contact: 'samyoghosh.cse2023@nsec.ac.in'
  },
  {
    id: 5,
    name: 'Sabyasachi Dev',
    role: 'Research Specialist',
    image: '📊',
    bio: 'Sabyasachi Dev is responsible for the research work for our team. He gathers and analyzes the information that forms the foundation of our project, ensuring our solution is well-informed and data-driven.',
    specialties: ['Data Research', 'Market Analysis', 'Information Systems'],
    education: 'Computer Science and Engineering',
    contact: 'sabyasachidev.cse2023@nsec.ac.in'
  },
  {
    id: 6,
    name: 'Sohini Dey',
    role: 'Documentation & Presentation Specialist',
    image: '📝',
    bio: 'Sohini Dey is our team\'s Documentation and Presentation Specialist. She is responsible for organizing all project data and creating the presentation slides, ensuring our work is clearly and professionally showcased.',
    specialties: ['Technical Documentation', 'Presentation Design', 'Data Organization'],
    education: 'Computer Science and Engineering',
    contact: 'sohinidey.cse2023@nsec.ac.in'
  }
];

const achievements = [
  { icon: '🎓', number: '50,000+', label: 'Students Guided' },
  { icon: '🏛️', number: '200+', label: 'Partner Colleges' },
  { icon: '⭐', number: '4.8/5', label: 'User Rating' },
  { icon: '📍', number: '15+', label: 'Cities Covered' },
  { icon: '💼', number: '85%', label: 'Placement Success' },
  { icon: '🏆', number: '25+', label: 'Awards Won' }
];

const milestones = [
  {
    year: 'August 2025',
    title: 'Foundation',
    description: 'Aspire Sync was founded with a vision to democratize access to quality educational guidance in J&K.',
    icon: '🚀'
  },
  {
    year: 'September 2025',
    title: 'Platform Launch',
    description: 'Launched our first web platform connecting students with colleges and career guidance resources.',
    icon: '💻'
  },
  {
    year: 'September 2025',
    title: 'AI Integration',
    description: 'Integrated AI-powered career matching and personalized recommendation systems.',
    icon: '🤖'
  },
  {
    year: 'September 2025',
    title: 'Mobile App Launch',
    description: 'Launched mobile applications for iOS and Android with offline capabilities.',
    icon: '📱'
  },
  {
    year: '2025-2026',
    title: 'Future Vision',
    description: 'Expanding to pan-India operations while maintaining focus on personalized guidance.',
    icon: '🌟'
  }
];

export default function AboutUs() {
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  const [visibleStats, setVisibleStats] = useState(false);
  const [counters, setCounters] = useState(achievements.map(() => 0));

  // Animate counters when stats become visible
  useEffect(() => {
    if (visibleStats) {
      achievements.forEach((achievement, index) => {
        const finalNumber = parseInt(achievement.number.replace(/[^0-9.]/g, ''));
        let current = 0;
        const increment = finalNumber / 50; // 50 steps for animation
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalNumber) {
            current = finalNumber;
            clearInterval(timer);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(current);
            return newCounters;
          });
        }, 30);
      });
    }
  }, [visibleStats]);

  // Intersection observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleStats(true);
        }
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector('.achievements-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const formatNumber = (num, original) => {
    if (original.includes('%')) return `${num}%`;
    if (original.includes('/')) return original; // Keep ratings as is
    if (num >= 1000) return `${Math.floor(num / 1000)}K+`;
    return `${num}+`;
  };

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>
            <span className="hero-icon">✨</span>
            About Aspire Sync
          </h1>
          <p className="hero-subtitle">
            Empowering Dreams, Guiding Futures
          </p>
          <p className="hero-description">
            We're on a mission to transform how students in Jammu & Kashmir discover their perfect 
            educational path and career opportunities. Through innovative technology and personalized 
            guidance, we bridge the gap between student aspirations and educational excellence.
          </p>
          <div className="hero-actions">
            <Link to="/quiz" className="cta-primary">
              Start Your Journey
            </Link>
            <Link to="/contact" className="cta-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="floating-item graduation">🎓</div>
            <div className="floating-item book">📚</div>
            <div className="floating-item star">⭐</div>
            <div className="floating-item rocket">🚀</div>
            <div className="floating-item target">🎯</div>
            <div className="floating-item light">💡</div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission-card">
          <div className="card-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To democratize access to quality educational guidance and career counseling 
            for every student in Jammu & Kashmir, regardless of their background or location. 
            We believe every student deserves the opportunity to discover their potential 
            and pursue their dreams with confidence.
          </p>
        </div>
        <div className="vision-card">
          <div className="card-icon">🌟</div>
          <h3>Our Vision</h3>
          <p>
            To become the leading platform for educational guidance in India, creating 
            a future where every student makes informed decisions about their education 
            and career, contributing to a more skilled and prosperous society.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <h2>Our Impact in Numbers</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-number">
                {formatNumber(counters[index], achievement.number)}
              </div>
              <div className="achievement-label">{achievement.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2>Meet Our Team</h2>
          <p>Passionate experts dedicated to your success</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className={`team-card ${activeTeamMember === member.id ? 'active' : ''}`}
              onClick={() => setActiveTeamMember(activeTeamMember === member.id ? null : member.id)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="member-avatar">
                <span className="avatar-emoji">{member.image}</span>
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
                
                {activeTeamMember === member.id && (
                  <div className="member-details">
                    <div className="member-education">
                      <strong>Education:</strong> {member.education}
                    </div>
                    <div className="member-specialties">
                      <strong>Specialties:</strong>
                      <div className="specialties-list">
                        {member.specialties.map((specialty, idx) => (
                          <span key={idx} className="specialty-tag">{specialty}</span>
                        ))}
                      </div>
                    </div>
                    <div className="member-contact">
                      <strong>Contact:</strong> 
                      <a href={`mailto:${member.contact}`}>{member.contact}</a>
                    </div>
                  </div>
                )}
              </div>
              <div className="expand-indicator">
                {activeTeamMember === member.id ? '−' : '+'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey-section">
        <div className="section-header">
          <h2>Our Journey</h2>
          <p>Milestones in our mission to transform education</p>
        </div>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.year} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="timeline-content">
                <div className="milestone-icon">{milestone.icon}</div>
                <div className="milestone-year">{milestone.year}</div>
                <h3 className="milestone-title">{milestone.title}</h3>
                <p className="milestone-description">{milestone.description}</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🎓</div>
            <h3>Excellence</h3>
            <p>We strive for the highest quality in everything we do, from our platform to our guidance services.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Accessibility</h3>
            <p>Education guidance should be available to everyone, regardless of their economic or social background.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💡</div>
            <h3>Innovation</h3>
            <p>We continuously innovate to provide cutting-edge solutions for modern educational challenges.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3>Empathy</h3>
            <p>We understand the challenges students face and approach each interaction with genuine care and understanding.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of students who have found their perfect educational path with Aspire Sync.</p>
          <div className="cta-actions">
            <Link to="/quiz" className="cta-btn primary">
              Take Career Quiz
            </Link>
            <Link to="/college" className="cta-btn secondary">
              Explore Colleges
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}