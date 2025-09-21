// src/pages/CourseDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, BookOpen, TrendingUp, CheckCircle, Star } from 'lucide-react';
import './CourseDetails.css';

// Comprehensive course data
const courseDetails = {
  mbbs: {
    name: 'M.B.B.S. (Bachelor of Medicine, Bachelor of Surgery)',
    icon: '/assets/mbbs-icon.png',
    duration: '5.5 Years + 1 Year Internship',
    eligibility: 'PCB (Physics, Chemistry, Biology) with minimum 50% marks',
    averageFees: '₹20,00,000 - ₹1,00,00,000',
    description: 'MBBS is the most sought-after undergraduate medical degree that prepares students to become qualified doctors. This comprehensive program combines theoretical knowledge with practical clinical experience.',
    careerOptions: [
      'General Physician',
      'Specialist Doctor (MD/MS)',
      'Surgeon',
      'Medical Officer',
      'Research Scientist',
      'Medical Consultant',
      'Hospital Administrator',
      'Medical Writer'
    ],
    subjects: [
      'Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 
      'Pharmacology', 'Microbiology', 'Forensic Medicine', 
      'Community Medicine', 'Medicine', 'Surgery', 'Pediatrics', 
      'Obstetrics & Gynecology', 'Orthopedics', 'ENT', 'Ophthalmology'
    ],
    topColleges: [
      'AIIMS Delhi', 'CMC Vellore', 'JIPMER Puducherry', 
      'KGMU Lucknow', 'MAMC Delhi', 'Seth GS Medical College'
    ],
    entranceExams: ['NEET-UG'],
    averageSalary: '₹6,00,000 - ₹15,00,000 per annum',
    jobOpportunities: 95,
    industryGrowth: 'High'
  },
  btech: {
    name: 'B.Tech (Bachelor of Technology)',
    icon: '/assets/btech-icon.png',
    duration: '4 Years',
    eligibility: 'PCM (Physics, Chemistry, Mathematics) with minimum 50% marks',
    averageFees: '₹4,00,000 - ₹20,00,000',
    description: 'B.Tech is a comprehensive engineering degree that provides students with technical skills and knowledge in various engineering disciplines, preparing them for the rapidly evolving technology sector.',
    careerOptions: [
      'Software Engineer',
      'Data Scientist',
      'Cybersecurity Analyst',
      'Machine Learning Engineer',
      'DevOps Engineer',
      'Product Manager',
      'Technical Consultant',
      'Research & Development Engineer'
    ],
    subjects: [
      'Engineering Mathematics', 'Programming Languages', 'Data Structures', 
      'Computer Networks', 'Database Systems', 'Software Engineering', 
      'Machine Learning', 'Cybersecurity', 'Cloud Computing', 
      'Mobile App Development', 'Web Technologies', 'AI & Robotics'
    ],
    topColleges: [
      'IIT Delhi', 'IIT Bombay', 'IIT Madras', 
      'NIT Trichy', 'BITS Pilani', 'VIT Vellore'
    ],
    entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE'],
    averageSalary: '₹8,00,000 - ₹25,00,000 per annum',
    jobOpportunities: 98,
    industryGrowth: 'Very High'
  },
  bca: {
    name: 'BCA (Bachelor of Computer Applications)',
    icon: '/assets/bca-icon.png',
    duration: '3 Years',
    eligibility: 'Any stream with Mathematics (some colleges), minimum 50% marks',
    averageFees: '₹1,50,000 - ₹6,00,000',
    description: 'BCA is designed to provide students with a strong foundation in computer applications, programming, and IT skills, making them industry-ready for the growing IT sector.',
    careerOptions: [
      'Software Developer',
      'Web Developer',
      'System Administrator',
      'Database Administrator',
      'IT Support Specialist',
      'Mobile App Developer',
      'Quality Analyst',
      'Technical Writer'
    ],
    subjects: [
      'Programming in C', 'Data Structures', 'Database Management', 
      'Web Technologies', 'Software Engineering', 'Computer Networks', 
      'Mobile Application Development', 'System Analysis', 
      'E-Commerce', 'Multimedia Systems', 'Project Management'
    ],
    topColleges: [
      'Loyola College Chennai', 'Christ University Bangalore', 'Presidency College Chennai',
      'St. Xavier\'s College Mumbai', 'Symbiosis Pune', 'Amity University'
    ],
    entranceExams: ['University-specific entrance tests', 'Merit-based admission'],
    averageSalary: '₹3,50,000 - ₹8,00,000 per annum',
    jobOpportunities: 85,
    industryGrowth: 'High'
  },
  bcom: {
    name: 'B.Com (Bachelor of Commerce)',
    icon: '/assets/bcom-icon.png',
    duration: '3 Years',
    eligibility: 'Any stream with minimum 50% marks (Commerce preferred)',
    averageFees: '₹50,000 - ₹3,00,000',
    description: 'B.Com provides comprehensive knowledge of commerce, accounting, finance, and business management, preparing students for diverse careers in the business world.',
    careerOptions: [
      'Chartered Accountant (CA)',
      'Financial Analyst',
      'Investment Banker',
      'Tax Consultant',
      'Business Analyst',
      'Banking Officer',
      'Insurance Agent',
      'Entrepreneur'
    ],
    subjects: [
      'Financial Accounting', 'Business Mathematics', 'Economics', 
      'Business Law', 'Corporate Accounting', 'Auditing', 
      'Taxation', 'Financial Management', 'Marketing Management', 
      'Human Resource Management', 'International Business'
    ],
    topColleges: [
      'SRCC Delhi', 'LSR Delhi', 'St. Xavier\'s Mumbai',
      'Loyola College Chennai', 'Christ University Bangalore', 'HR College Mumbai'
    ],
    entranceExams: ['DU JAT', 'CUET', 'University-specific tests'],
    averageSalary: '₹3,00,000 - ₹12,00,000 per annum',
    jobOpportunities: 80,
    industryGrowth: 'Moderate to High'
  },
  // Additional courses
  ba: {
    name: 'B.A. (Bachelor of Arts)',
    emoji: '📚',
    duration: '3 Years',
    eligibility: 'Any stream with minimum 50% marks',
    averageFees: '₹30,000 - ₹2,00,000',
    description: 'Bachelor of Arts offers a liberal education with diverse subjects in humanities, social sciences, and languages, developing critical thinking and communication skills.',
    careerOptions: [
      'Civil Services Officer (IAS/IPS)',
      'Journalist',
      'Teacher/Professor',
      'Lawyer',
      'Content Writer',
      'Social Worker',
      'Translator',
      'Public Relations Officer'
    ],
    subjects: [
      'English Literature', 'History', 'Political Science', 
      'Sociology', 'Psychology', 'Economics', 'Philosophy', 
      'Geography', 'Anthropology', 'Mass Communication'
    ],
    topColleges: [
      'Hindu College Delhi', 'St. Stephen\'s College Delhi', 'Presidency College Kolkata',
      'Fergusson College Pune', 'Christ University Bangalore'
    ],
    entranceExams: ['CUET', 'University-specific entrance tests'],
    averageSalary: '₹2,50,000 - ₹10,00,000 per annum',
    jobOpportunities: 75,
    industryGrowth: 'Moderate'
  },
  bsc: {
    name: 'B.Sc (Bachelor of Science)',
    emoji: '🔬',
    duration: '3 Years',
    eligibility: 'PCM/PCB with minimum 50% marks',
    averageFees: '₹50,000 - ₹3,00,000',
    description: 'Bachelor of Science provides scientific knowledge and research skills in various fields, preparing students for careers in research, technology, and academia.',
    careerOptions: [
      'Research Scientist',
      'Laboratory Technician',
      'Data Analyst',
      'Quality Control Analyst',
      'Environmental Scientist',
      'Biotechnologist',
      'Statistician',
      'Science Teacher'
    ],
    subjects: [
      'Mathematics', 'Physics', 'Chemistry', 'Biology', 
      'Statistics', 'Computer Science', 'Environmental Science', 
      'Biotechnology', 'Microbiology', 'Geology'
    ],
    topColleges: [
      'St. Stephen\'s College Delhi', 'Loyola College Chennai', 'Fergusson College Pune',
      'Presidency University Kolkata', 'Christ University Bangalore'
    ],
    entranceExams: ['CUET', 'University-specific entrance tests'],
    averageSalary: '₹3,00,000 - ₹8,00,000 per annum',
    jobOpportunities: 80,
    industryGrowth: 'High'
  },
  bba: {
    name: 'B.B.A (Bachelor of Business Administration)',
    emoji: '💼',
    duration: '3 Years',
    eligibility: 'Any stream with minimum 50% marks',
    averageFees: '₹2,00,000 - ₹8,00,000',
    description: 'Bachelor of Business Administration provides comprehensive knowledge of business management, entrepreneurship, and leadership skills for the corporate world.',
    careerOptions: [
      'Business Manager',
      'Marketing Executive',
      'Human Resources Manager',
      'Financial Analyst',
      'Operations Manager',
      'Entrepreneur',
      'Business Consultant',
      'Sales Manager'
    ],
    subjects: [
      'Business Management', 'Marketing Management', 'Human Resource Management', 
      'Financial Management', 'Operations Management', 'Business Ethics', 
      'Entrepreneurship', 'International Business', 'Business Law', 'Economics'
    ],
    topColleges: [
      'Shaheed Sukhdev College of Business Studies', 'Christ University Bangalore', 
      'Symbiosis Centre for Management Studies', 'Narsee Monjee College Mumbai'
    ],
    entranceExams: ['DU JAT', 'IPMAT', 'CUET', 'University-specific tests'],
    averageSalary: '₹4,00,000 - ₹12,00,000 per annum',
    jobOpportunities: 85,
    industryGrowth: 'High'
  },
  sports: {
    name: 'Sports Science & Physical Education',
    emoji: '⚽',
    duration: '3-4 Years',
    eligibility: 'Any stream with minimum 50% marks + Physical fitness test',
    averageFees: '₹1,00,000 - ₹5,00,000',
    description: 'Sports Science combines the study of human movement, exercise physiology, and sports management to prepare students for careers in the growing sports and fitness industry.',
    careerOptions: [
      'Sports Coach',
      'Fitness Trainer',
      'Sports Manager',
      'Sports Journalist',
      'Physiotherapist',
      'Sports Nutritionist',
      'Athlete',
      'Sports Event Manager'
    ],
    subjects: [
      'Exercise Physiology', 'Sports Psychology', 'Biomechanics', 
      'Sports Nutrition', 'Sports Management', 'Athletic Training', 
      'Sports Medicine', 'Recreation Management', 'Sports Marketing'
    ],
    topColleges: [
      'LNIPE Gwalior', 'Punjabi University Patiala', 'Jamia Millia Islamia',
      'Banaras Hindu University', 'University of Delhi'
    ],
    entranceExams: ['Physical fitness tests', 'University-specific entrance'],
    averageSalary: '₹2,00,000 - ₹8,00,000 per annum',
    jobOpportunities: 70,
    industryGrowth: 'High'
  },
  design: {
    name: 'Design (Fashion/Graphic/Interior)',
    emoji: '🎨',
    duration: '3-4 Years',
    eligibility: 'Any stream with minimum 50% marks + Portfolio/Aptitude test',
    averageFees: '₹3,00,000 - ₹15,00,000',
    description: 'Design courses offer creative and technical training in various design fields, preparing students for careers in the creative industry.',
    careerOptions: [
      'Graphic Designer',
      'Fashion Designer',
      'Interior Designer',
      'UI/UX Designer',
      'Product Designer',
      'Animation Artist',
      'Art Director',
      'Creative Director'
    ],
    subjects: [
      'Design Fundamentals', 'Color Theory', 'Typography', 
      'Digital Design', 'Fashion Illustration', 'Pattern Making', 
      'Interior Planning', 'Material Studies', 'Design Software', 'Portfolio Development'
    ],
    topColleges: [
      'NIFT Delhi', 'NID Ahmedabad', 'Pearl Academy', 
      'Symbiosis Institute of Design', 'MIT Institute of Design'
    ],
    entranceExams: ['NIFT Entrance', 'NID DAT', 'CEED', 'University-specific tests'],
    averageSalary: '₹3,50,000 - ₹15,00,000 per annum',
    jobOpportunities: 75,
    industryGrowth: 'Very High'
  },
  hotel: {
    name: 'Hotel Management & Tourism',
    emoji: '🏨',
    duration: '3-4 Years',
    eligibility: 'Any stream with minimum 50% marks',
    averageFees: '₹2,00,000 - ₹10,00,000',
    description: 'Hotel Management prepares students for careers in hospitality, tourism, and service industries with focus on customer service excellence and business management.',
    careerOptions: [
      'Hotel Manager',
      'Event Manager',
      'Tourism Officer',
      'Restaurant Manager',
      'Front Office Manager',
      'Housekeeping Manager',
      'Travel Consultant',
      'Cruise Director'
    ],
    subjects: [
      'Hotel Operations', 'Food & Beverage Management', 'Front Office Operations', 
      'Housekeeping Management', 'Tourism Management', 'Event Management', 
      'Hospitality Marketing', 'Hotel Finance', 'Customer Service', 'Culinary Arts'
    ],
    topColleges: [
      'IHM Delhi', 'IHM Mumbai', 'Welcomgroup Graduate School of Hotel Administration',
      'Christ University Bangalore', 'Amity University'
    ],
    entranceExams: ['NCHM JEE', 'University-specific entrance tests'],
    averageSalary: '₹3,00,000 - ₹10,00,000 per annum',
    jobOpportunities: 80,
    industryGrowth: 'High'
  }
  // Add more courses as needed...
};

export default function CourseDetails() {
  const { courseId } = useParams();
  const course = courseDetails[courseId];

  if (!course) {
    return (
      <div className="course-details-page">
        <div className="error-container">
          <h1>Course Not Found</h1>
          <p>The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="back-button">
            <ArrowLeft size={20} />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="course-details-page">
      {/* Back Navigation */}
      <Link to="/courses" className="back-button">
        <ArrowLeft size={20} />
        Back to Courses
      </Link>

      {/* Course Header */}
      <div className="course-header">
        <div className="course-header-content">
          <div className="course-icon-large">
            {course.emoji ? (
              <span className="course-emoji-large">{course.emoji}</span>
            ) : (
              <img src={course.icon} alt={`${course.name} icon`} />
            )}
          </div>
          <div className="course-title-section">
            <h1>{course.name}</h1>
            <p className="course-description">{course.description}</p>
            <div className="course-quick-stats">
              <div className="quick-stat">
                <Clock size={18} />
                <span>{course.duration}</span>
              </div>
              <div className="quick-stat">
                <Users size={18} />
                <span>{course.jobOpportunities}% Job Opportunities</span>
              </div>
              <div className="quick-stat">
                <TrendingUp size={18} />
                <span>{course.industryGrowth} Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details Grid */}
      <div className="course-details-grid">
        
        {/* Basic Information */}
        <div className="detail-card">
          <h3><BookOpen size={20} />Course Information</h3>
          <div className="detail-item">
            <strong>Duration:</strong>
            <span>{course.duration}</span>
          </div>
          <div className="detail-item">
            <strong>Eligibility:</strong>
            <span>{course.eligibility}</span>
          </div>
          <div className="detail-item">
            <strong>Average Fees:</strong>
            <span>{course.averageFees}</span>
          </div>
          <div className="detail-item">
            <strong>Average Salary:</strong>
            <span>{course.averageSalary}</span>
          </div>
        </div>

        {/* Career Options */}
        <div className="detail-card">
          <h3><Star size={20} />Career Opportunities</h3>
          <div className="career-grid">
            {course.careerOptions.map((career, index) => (
              <div key={index} className="career-item">
                <CheckCircle size={16} />
                <span>{career}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="detail-card">
          <h3><BookOpen size={20} />Key Subjects</h3>
          <div className="subjects-grid">
            {course.subjects.map((subject, index) => (
              <div key={index} className="subject-tag">
                {subject}
              </div>
            ))}
          </div>
        </div>

        {/* Top Colleges */}
        <div className="detail-card">
          <h3><Star size={20} />Top Colleges</h3>
          <div className="colleges-list">
            {course.topColleges.map((college, index) => (
              <div key={index} className="college-item">
                <CheckCircle size={16} />
                <span>{college}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Entrance Exams */}
        <div className="detail-card">
          <h3><BookOpen size={20} />Entrance Exams</h3>
          <div className="exams-list">
            {course.entranceExams.map((exam, index) => (
              <div key={index} className="exam-tag">
                {exam}
              </div>
            ))}
          </div>
        </div>

        {/* Industry Insights */}
        <div className="detail-card industry-insights">
          <h3><TrendingUp size={20} />Industry Insights</h3>
          <div className="insights-grid">
            <div className="insight-item">
              <div className="insight-number">{course.jobOpportunities}%</div>
              <div className="insight-label">Job Opportunities</div>
            </div>
            <div className="insight-item">
              <div className="insight-number">{course.industryGrowth}</div>
              <div className="insight-label">Industry Growth</div>
            </div>
            <div className="insight-item">
              <div className="insight-number">4.5★</div>
              <div className="insight-label">Career Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="course-actions">
        <Link to="/quiz" className="action-button primary">
          Take Career Quiz
        </Link>
        <Link to="/college" className="action-button secondary">
          Find Colleges
        </Link>
        <Link to="/resources" className="action-button secondary">
          Study Resources
        </Link>
      </div>
    </div>
  );
}