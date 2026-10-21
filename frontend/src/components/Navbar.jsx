import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  ChevronDown, 
  Phone, 
  Menu, 
  X, 
  GraduationCap, 
  Code, 
  Globe2, 
  Calendar,
  MessageCircle,
  Database,
  Briefcase,
  Mail,
  Send,
  MessageSquare,
  Brain
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenDemo, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <div className="announcement-left">
            <span className="live-dot"></span>
            <span className="announcement-text">
              <strong>Admissions Open 2026-27:</strong> 1-on-1 Online Tuition for IGCSE, IB, SABIS, STEAM & Languages
            </span>
          </div>
          <div className="announcement-right">
            <a href="tel:+916283609913" className="top-link">
              <Phone size={13} /> +91 6283 609 913
            </a>
            <span className="divider">|</span>
            <a 
              href="https://wa.me/916283609913?text=Hi%20Magπ,%20I%20would%20like%20to%20inquire%20about%20online%20tuition" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="top-link top-whatsapp"
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <span className="divider">|</span>
            <button 
              onClick={onOpenAdmin} 
              className="top-link top-admin-btn"
              title="View Leads Database"
            >
              <Database size={13} /> Admin Leads
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" aria-label="Magπ Home">
            <img src="/images/logo.png" alt="Magπ" className="brand-logo-img" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-menu">
              <li>
                <NavLink 
                  to="/" 
                  end
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about-us" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/events" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Events
                </NavLink>
              </li>

              {/* Online Tuition Dropdown */}
              <li 
                className="nav-item has-dropdown"
                onMouseEnter={() => setActiveDropdown('academics')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="dropdown-trigger-wrapper">
                  <NavLink 
                    to="/online-tuition" 
                    className={({ isActive }) => `nav-link dropdown-toggle ${isActive ? 'active' : ''}`}
                  >
                    Online Tuition
                  </NavLink>
                  <button 
                    className="dropdown-chevron-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown('academics');
                    }}
                    aria-label="Toggle tuition dropdown"
                  >
                    <ChevronDown size={14} className={`arrow-icon ${activeDropdown === 'academics' ? 'rotated' : ''}`} />
                  </button>
                </div>

                {activeDropdown === 'academics' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <GraduationCap size={16} /> <span>Curriculums We Cover</span>
                    </div>
                    <Link to="/online-tuition" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong>All Online Tuition Programs</strong>
                      <span>Explore all global boards & subjects</span>
                    </Link>
                    <Link to="/online-tuition#igcse" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong>Cambridge IGCSE & GCSE</strong>
                      <span>CAIE & Pearson Edexcel Core/Ext</span>
                    </Link>
                    <Link to="/online-tuition#ib" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong>IB MYP & Diploma (DP)</strong>
                      <span>Math AA/AI, Physics, Chem HL</span>
                    </Link>
                    <Link to="/online-tuition#alevels" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong>Cambridge AS & A-Levels</strong>
                      <span>Advanced Pure Math & Sciences</span>
                    </Link>
                    <Link to="/online-tuition#sabis" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong>SABIS Educational System</strong>
                      <span>Choueifat School Term Finals</span>
                    </Link>
                    <div className="dropdown-divider" style={{ borderTop: '1px solid var(--slate-200)', margin: '0.4rem 0' }}></div>
                    <a href="/#find-tutor" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong style={{ color: 'var(--primary)' }}>🎯 Tutor Matchmaker Quiz</strong>
                      <span>Find ideal examiner in 45 seconds</span>
                    </a>
                    <a href="/#pricing-calculator" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong style={{ color: 'var(--primary)' }}>💰 Fee & Savings Calculator</strong>
                      <span>Calculate custom package rates</span>
                    </a>
                    <a href="/#faculty" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong>👨‍🏫 Top 1% Faculty Directory</strong>
                      <span>Meet certified board examiners</span>
                    </a>
                    <a href="/#resources" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <strong>📚 Free Revision Guides</strong>
                      <span>Download syllabus cheat-sheets</span>
                    </a>
                  </div>
                )}
              </li>

              {/* Skill Courses Dropdown */}
              <li 
                className="nav-item has-dropdown"
                onMouseEnter={() => setActiveDropdown('skills')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className={`nav-link dropdown-toggle ${['/communication', '/coding-and-programming', '/language-classes', '/reasoning-and-aptitude'].includes(location.pathname) ? 'active' : ''}`}
                  onClick={() => toggleDropdown('skills')}
                  aria-expanded={activeDropdown === 'skills'}
                >
                  Skill Courses <ChevronDown size={14} className={`arrow-icon ${activeDropdown === 'skills' ? 'rotated' : ''}`} />
                </button>
                {activeDropdown === 'skills' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <Code size={16} /> <span>Specialized Skill Academies</span>
                    </div>
                    <Link to="/communication" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <div className="dropdown-item-content">
                        <strong>Communication Skills</strong>
                        <span>Public Speaking, Debate, MUN & Writing</span>
                      </div>
                    </Link>
                    <Link to="/coding-and-programming" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <div className="dropdown-item-content">
                        <strong>Coding and Programming</strong>
                        <span>Python, AI, Scratch & Web Development</span>
                      </div>
                    </Link>
                    <Link to="/language-classes" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <div className="dropdown-item-content">
                        <strong>Global Languages</strong>
                        <span>French, Spanish, German & Mandarin</span>
                      </div>
                    </Link>
                    <Link to="/reasoning-and-aptitude" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <div className="dropdown-item-content">
                        <strong>Reasoning & Aptitude</strong>
                        <span>Vedic Math, Olympiad & Logic Puzzles</span>
                      </div>
                    </Link>
                  </div>
                )}
              </li>

              <li>
                <NavLink 
                  to="/careers" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Careers
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact-us" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="header-actions">
            <Link 
              to="/contact-us"
              className="btn btn-secondary btn-sm d-none-mobile"
            >
              <Send size={15} /> Get In Touch!
            </Link>
            <button 
              onClick={() => onOpenDemo()}
              className="btn btn-primary btn-sm glow-on-hover"
            >
              <Sparkles size={16} /> Book a Free Demo
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer">
            <div className="mobile-drawer-inner">
              <nav className="mobile-nav">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                <Link to="/events" onClick={() => setIsMobileMenuOpen(false)}>Upcoming Events</Link>
                <Link to="/online-tuition" onClick={() => setIsMobileMenuOpen(false)}>Online Tuition (IGCSE/IB/SABIS)</Link>
                
                <div className="mobile-nav-subgroup">
                  <span className="mobile-group-title">Interactive Tools & Resources</span>
                  <a href="/#find-tutor" onClick={() => setIsMobileMenuOpen(false)}>• 🎯 45-Sec Tutor Matchmaker</a>
                  <a href="/#pricing-calculator" onClick={() => setIsMobileMenuOpen(false)}>• 💰 Fee & Savings Calculator</a>
                  <a href="/#faculty" onClick={() => setIsMobileMenuOpen(false)}>• 👨‍🏫 Meet Our Faculty</a>
                  <a href="/#resources" onClick={() => setIsMobileMenuOpen(false)}>• 📚 Free Revision Guides</a>
                </div>

                <div className="mobile-nav-subgroup">
                  <span className="mobile-group-title">Skill Courses</span>
                  <Link to="/communication" onClick={() => setIsMobileMenuOpen(false)}>• Communication Skills (Speech & MUN)</Link>
                  <Link to="/coding-and-programming" onClick={() => setIsMobileMenuOpen(false)}>• Coding & Programming (Python & AI)</Link>
                  <Link to="/language-classes" onClick={() => setIsMobileMenuOpen(false)}>• Global Languages (French & Spanish)</Link>
                  <Link to="/reasoning-and-aptitude" onClick={() => setIsMobileMenuOpen(false)}>• Reasoning & Aptitude (Olympiad Math)</Link>
                </div>

                <Link to="/careers" onClick={() => setIsMobileMenuOpen(false)}>Careers / Become a Tutor</Link>
                <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
              </nav>

              <div className="mobile-drawer-footer">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenDemo();
                  }}
                  className="btn btn-primary btn-full"
                >
                  <Sparkles size={18} /> Book a Free Demo
                </button>
                <a 
                  href="https://wa.me/916283609913" 
                  className="btn btn-whatsapp btn-full"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
