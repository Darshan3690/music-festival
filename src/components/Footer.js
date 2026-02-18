import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Instagram, Twitter, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <Music size={28} />
              </div>
              <div className="logo-text">
                <span className="logo-title">Marwadi Music Festival</span>
                <span className="logo-subtitle">2026 Edition</span>
              </div>
            </div>
            <p className="footer-description">
              Experience 3 days of non-stop music with 50+ artists across 7 stages 
              at Marwadi University, Rajkot. The biggest music festival of Gujarat!
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><Instagram size={20} /></a>
              <a href="#" className="social-link"><Twitter size={20} /></a>
              <a href="#" className="social-link"><Youtube size={20} /></a>
              <a href="#" className="social-link"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <Link to="/">Home</Link>
              <Link to="/artists">Artists</Link>
              <Link to="/schedule">Schedule</Link>
              <Link to="/stages">Stages</Link>
            </div>

            <div className="footer-column">
              <h4>Information</h4>
              <a href="#">FAQs</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Refund Policy</a>
            </div>

            <div className="footer-column">
              <h4>Contact Us</h4>
              <a href="mailto:info@mmf2026.com" className="contact-item">
                <Mail size={16} />
                info@mmf2026.com
              </a>
              <a href="tel:+919999999999" className="contact-item">
                <Phone size={16} />
                +91 99999 99999
              </a>
              <a href="#" className="contact-item">
                <MapPin size={16} />
                Marwadi University, Rajkot
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Marwadi Music Festival. All rights reserved.</p>
          <p>Made with ❤️ in Gujarat, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
