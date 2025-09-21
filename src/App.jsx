// Updated App.jsx with Fixed Navbar Placement

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import all components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CollegeFinder from './pages/CollegeFinder';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails'; // New import
import Quiz from './pages/Quiz';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";

export default function App() {
  return (
    <Router>
      {/* Navbar placed OUTSIDE app-container so it's independent */}
      <Navbar />

      <div className="app-container">
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/college" element={<CollegeFinder />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course-details/:courseId" element={<CourseDetails />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Add individual college detail route */}
            <Route path="/college/:id" element={<CollegeDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// Enhanced College Detail Component
const CollegeDetail = () => {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '60vh',
      color: 'white',
      borderRadius: '20px',
      margin: '1rem'
    }}>
      <h1>🏛️ College Details</h1>
      <p>Individual college details will be displayed here</p>
      <p style={{ opacity: 0.8 }}>This feature is coming soon!</p>
    </div>
  );
};