import React, { useState, useEffect, useRef } from 'react';
// Removed 'Link' as we use standard 'a' tags for this self-contained example
import './Home.css';
import AspireSyncChatbot from '../components/AspireSyncChatbot';

// --- Reusable Feature Card Component ---
function FeatureCard({ title, desc, cta, image, href }) {
  return (
    <a href={href} className="feature-card">
      <img src={image} alt={title} className="feature-img" />
      <h3>{title}</h3>
      <p>{desc}</p>
      <button className="feature-btn">{cta}</button>
    </a>
  );
}

// --- Animated Counter for "Happy Clients" ---
function AnimatedCounter({ finalValue, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = finalValue;
          if (start === end) return;

          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              // Ensure it ends on the exact value
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect(); // Stop observing after animation starts
        }
      },
      { threshold: 0.7 } // Start when 70% of the element is visible
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [finalValue, duration]);
  
  const displayValue = count >= 5000 ? '5K+' : count;

  return (
    <span ref={counterRef} className="happy-clients-number">
      {displayValue}
    </span>
  );
}


// --- New Testimonials Section Component ---
function Testimonials() {
  const testimonialsData = [
    {
      quote: "Aspire Sync completely changed my college search game! I was so overwhelmed with hundreds of options, but their college finder narrowed it down to 5 perfect matches. Got into my top choice with a scholarship!",
      author: "Dr. Emily Rodriguez",
      role: "Student, J&K",
      img: "https://i.pravatar.cc/150?img=1"
    },
    {
      quote: "The career quiz blew my mind! I thought I wanted to be a doctor, but it showed me UX design - something I'd never heard of. Now I'm pursuing it and absolutely loving every moment of learning.",
      author: "Sarah Williams",
      role: "Student, WB",
      img: "https://i.pravatar.cc/150?img=2"
    },
    {
      quote: "I was totally lost about my major until I found Aspire Sync. The resources section has everything - from career guides to interview prep. Just landed my first internship at a startup!",
      author: "David Kim",
      role: "Student, UP",
      img: "https://i.pravatar.cc/150?img=3"
    },
    {
      quote: "As a first-generation college student, I had no idea where to start. This platform walked me through everything step by step. The course recommendations are spot-on and actually fun to complete!",
      author: "Maria Garcia",
      role: "Student, MH",
      img: "https://i.pravatar.cc/150?img=4"
    },
    {
      quote: "The team's dedication and passion for their work is evident in the final product. Highly recommended.",
      author: "Johnathan Chen",
      role: "Teacher, WB",
      img: "https://i.pravatar.cc/150?img=5"
    }
  ];

  // Duplicate the array to create a seamless loop
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section className="testimonials">
      <h2 className="testimonial-title">
        What Our <span className="highlight">Students</span> Say <span className="highlight-green">About Us</span>
      </h2>

      <div className="testimonial-scroller">
        <div className="testimonial-track">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="quote-icon">❞</div>
              <div className="stars">★★★★★</div>
              <p>"{testimonial.quote}"</p>
              <div className="author">
                <img src={testimonial.img} alt={testimonial.author} />
                <div>
                  <h4>{testimonial.author}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="happy-clients">
        <AnimatedCounter finalValue={5000} /> Happy Students
      </div>
    </section>
  );
}


// --- Main Home Page Component ---
export default function Home() {
  return (
    <>
      <section className="home">
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <h1>
              Confused about your career?
              <br />
              We guide you every step of the way.
            </h1>
            <p>
              Take a short quiz, explore recommended courses and find the right
              government colleges in your area.
            </p>
            <div className="hero-buttons">
              <a href="/quiz" className="primary-btn">
                Take Career Quiz
              </a>
              <a href="/courses" className="secondary-btn">
                Explore Courses & Colleges
              </a>
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="roadmap">
          <div className="roadmap-step">
            <img src="/assets/student.png" alt="Student icon for quiz step" />
            <span>Take quiz</span>
          </div>
          <div className="roadmap-step2">
            <img src="/assets/tpp.png" alt="arrow" />
          </div>
          <div className="roadmap-step">
            <img src="/assets/roadmap.png" alt="Pathway icon for courses step" />
            <span>Get courses</span>
          </div>
          <div className="roadmap-step2">
            <img src="/assets/tpp.png" alt="arrow" />
          </div>
          <div className="roadmap-step">
            <img src="/assets/trophy.png" alt="Trophy icon for college step" />
            <span>Find college</span>
          </div>
        </div>

        {/* Features Section */}
        <div className="features">
          <FeatureCard
            image="/assets/hstudent.png"
            title="Career Quiz"
            desc="Find your best-fit career in 5 mins."
            cta="Career Quiz"
            href="/quiz"
          />
          <FeatureCard
            image="/assets/roadmap.png"
            title="Courses & Careers"
            desc="Explore pathways to success now."
            cta="Courses & Careers"
            href="/courses"
          />
          <FeatureCard
            image="/assets/trophy.png"
            title="College Finder"
            desc="Get the right college for your rank."
            cta="College Finder"
            href="/college"
          />
        </div>
      </section>
      
      {/* New Testimonials Section Added Here */}
      <Testimonials />
      <AspireSyncChatbot />
    </>
  );
}