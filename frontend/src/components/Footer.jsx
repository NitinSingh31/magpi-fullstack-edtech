import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Heart
} from 'lucide-react';
import './Footer.css';

export default function Footer({ onOpenDemo, onOpenAdmin }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer className="site-footer">
      {/* Top CTA Strip */}
      <div className="footer-cta-strip">
        <div className="container">
          <div className="cta-strip-inner">
            <div className="cta-strip-text">
              <span className="badge-tag gold">Give Your Child The Best Start</span>
              <h2>Start Your Child’s Free 45-Minute Diagnostic Class Today</h2>
              <p>Join over 12,500+ students achieving top grades with 1-on-1 personalized mentorship.</p>
            </div>
            <button onClick={() => onOpenDemo()} className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Book Free Trial Class
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo-badge" aria-label="Magπ Home">
              <img src="/images/logo.png" alt="Magπ" className="footer-logo-img" />
            </Link>

            <p className="footer-about-text">
              Magπ is an international premier EdTech platform providing personalized 1-on-1 online 
              academic tuition and futuristic skill training for students worldwide.
            </p>

            <div className="footer-trust-badge">
              <ShieldCheck size={20} className="trust-shield" />
              <span>Accredited Global Curriculum & Certified Child Safety Standards</span>
            </div>
          </div>

          {/* Curriculums */}
          <div className="footer-col">
            <h4 className="footer-col-title">Academic Tuition</h4>
            <ul className="footer-links">
              <li><Link to="/online-tuition#igcse">Cambridge IGCSE & GCSE</Link></li>
              <li><Link to="/online-tuition#ib">IB MYP & Diploma (DP)</Link></li>
              <li><Link to="/online-tuition#alevels">Cambridge AS & A-Levels</Link></li>
              <li><Link to="/online-tuition#sabis">SABIS Educational System</Link></li>
              <li><Link to="/online-tuition#ap">US Common Core & AP Prep</Link></li>
              <li><Link to="/online-tuition#cbse">CBSE & ICSE Global</Link></li>
            </ul>
          </div>

          {/* Skills */}
          <div className="footer-col">
            <h4 className="footer-col-title">Future Skill Labs</h4>
            <ul className="footer-links">
              <li><Link to="/coding-and-programming">Python, AI & Data Science</Link></li>
              <li><Link to="/communication">Public Speaking & Debate</Link></li>
              <li><Link to="/communication">Model United Nations (MUN)</Link></li>
              <li><Link to="/language-classes">French, Spanish & German Fluency</Link></li>
              <li><Link to="/reasoning-and-aptitude">Math Olympiad & Kangaroo</Link></li>
              <li><Link to="/reasoning-and-aptitude">Vedic Mental Math & Speed Logic</Link></li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links & Inquiries</h4>
            <ul className="footer-links" style={{ marginBottom: '1.25rem' }}>
              <li><Link to="/about-us">About Magπ & Story</Link></li>
              <li><Link to="/events">Live Events & Masterclasses</Link></li>
              <li><Link to="/careers">Careers / Join Faculty</Link></li>
              <li><Link to="/contact-us">Contact Academic Desks</Link></li>
            </ul>

            <ul className="footer-contact-list">
              <li>
                <Mail size={16} />
                <a href="mailto:admissions@magpi.education">admissions@magpi.education</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+919876543210">+91 98765 43210 (Global Desk)</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>Dubai • London • Singapore • New Delhi</span>
              </li>
            </ul>

            <div className="newsletter-box">
              <span className="newsletter-label">Subscribe to Exam Guides & Tips</span>
              {!newsletterSubscribed ? (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Parent's email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
                    <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <div className="newsletter-success">
                  <Check size={16} /> <span>Subscribed! Check your inbox for study guides.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Magπ Education Ltd. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link to="/about-us">Privacy Policy</Link>
            <span className="sep">•</span>
            <Link to="/about-us">Terms of Service</Link>
            <span className="sep">•</span>
            <Link to="/about-us">Child Protection Policy</Link>
            <span className="sep">•</span>
            <button onClick={onOpenAdmin} className="footer-admin-link">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
