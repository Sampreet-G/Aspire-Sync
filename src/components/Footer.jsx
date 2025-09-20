import React from 'react';
import './Footer.css'; // Import the new CSS file

// A simple SVG logo component for "Aspire Sync"
const Logo = () => (
  <img
    src="/logo.png"
    alt="Aspire Sync Logo"
    className="footer-logo-img"
    style={{ height: '32px', width: '32px' }}
  />
);


export default function Footer() {
  return (
    <footer className="site-footer">
      
      <div className="background-text-container">
        <h1 className="background-text">Aspire Sync</h1>
      </div>

      <div className="footer-content">
        <div className="footer-grid">

          {/* Column 1: Logo and Nav Links */}
          <div className="footer-column">
            <div className="footer-logo">
              <Logo />
              <span>Aspire Sync</span>
            </div>
            <nav className="footer-nav">
              <a href="/about">About Us</a>
              <a href="/courses">Courses</a>
              <a href="/faq">FAQ</a>
            </nav>
          </div>

          {/* Column 2: Newsletter */}
          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for the latest updates.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          {/* Column 3: Social Media */}
          <div className="footer-column">
            <h3>Social Media</h3>
            <nav className="footer-nav">
              {/* --- THIS IS THE UPDATED LINK --- */}
              <a href="https://www.linkedin.com/in/sampreetghosh/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-column">
            <h3>Contact Info</h3>
            <div className="contact-details">
              <p>+91 12345 67890</p>
              <p>hello@aspiresync.com</p>
              <p>123 Education Lane, Baguiati, Kolkata, West Bengal-700028</p>
            </div>
          </div>
          
        </div>

        {/* --- Sub-Footer --- */}
        <div className="sub-footer">
          <p>© {new Date().getFullYear()} Aspire Sync. All rights reserved.</p>
          <div className="sub-footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Services</a>
          </div>
        </div>
      </div>
    </footer>
  );
}