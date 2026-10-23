import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles,
  GraduationCap,
  Code,
  MessageSquare,
  Globe2,
  Brain,
  MessageCircle
} from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenDemo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      {/* Top Announcement Bar - Magπ Royal Navy #0A2540 */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <div className="announcement-left">
            <a href="tel:+919056999005" className="top-link">
              <Phone size={13} /> +91 90569 99005
            </a>
            <span className="divider">|</span>
            <a href="mailto:contact@magpiedu.com" className="top-link">
              <Mail size={13} /> contact@magpiedu.com
            </a>
          </div>
          
          <div className="announcement-right">
            <span className="follow-label">Follow Us:</span>
            <div className="social-pills">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Facebook">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="https://www.instagram.com/magpie__edu?exln=dXR3a2xoN2I3anhr" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="Instagram">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="X Twitter">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="LinkedIn">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle" aria-label="YouTube">
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Brand Logo - Magπ Logo */}
          <Link to="/" className="brand-logo" aria-label="Magπ Home">
            <img 
              src="/assets/magpi-logo.png" 
              alt="Magπ" 
              className="brand-logo-img" 
            />
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
              <li>
                <NavLink 
                  to="/online-tuition" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Online Tuition
                </NavLink>
              </li>

              {/* Skill Courses Dropdown */}
              <li 
                className="nav-item has-dropdown"
                onMouseEnter={() => setActiveDropdown('skills')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="dropdown-trigger-wrapper">
                  <span className={`nav-link dropdown-toggle ${['/communication', '/coding-and-programming', '/language-classes', '/reasoning-and-aptitude'].includes(location.pathname) ? 'active' : ''}`}>
                    Skill Courses
                  </span>
                  <ChevronDown size={14} className={`arrow-icon ${activeDropdown === 'skills' ? 'rotated' : ''}`} />
                </div>

                {activeDropdown === 'skills' && (
                  <div className="dropdown-menu">
                    <Link to="/communication" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <MessageSquare size={16} className="item-icon" />
                      <div>
                        <strong>Communication Skills</strong>
                        <span>Public Speaking, Debate & MUN</span>
                      </div>
                    </Link>
                    <Link to="/coding-and-programming" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <Code size={16} className="item-icon" />
                      <div>
                        <strong>Coding and Programming</strong>
                        <span>Scratch, Python, AI & Web Dev</span>
                      </div>
                    </Link>
                    <Link to="/language-classes" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <Globe2 size={16} className="item-icon" />
                      <div>
                        <strong>Global Languages</strong>
                        <span>French, Spanish, German, Mandarin</span>
                      </div>
                    </Link>
                    <Link to="/reasoning-and-aptitude" className="dropdown-item" onClick={() => setActiveDropdown(null)}>
                      <Brain size={16} className="item-icon" />
                      <div>
                        <strong>Reasoning & Aptitude</strong>
                        <span>Vedic Math & Olympiad prep</span>
                      </div>
                    </Link>
                  </div>
                )}
              </li>

              <li>
                <NavLink 
                  to="/contact-us" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/careers" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Careers
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Header Actions */}
          <div className="header-actions">
            <a 
              href="https://wa.me/919056999005?text=Hi%20Mag%CF%80,%20I%20would%20like%20to%20get%20in%20touch%20with%20an%20academic%20counselor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-get-in-touch"
            >
              <MessageCircle size={17} />
              <span>Get In Touch!</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer">
            <div className="mobile-drawer-inner">
              <ul className="mobile-menu-list">
                <li><NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
                <li><NavLink to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink></li>
                <li><NavLink to="/events" onClick={() => setIsMobileMenuOpen(false)}>Events</NavLink></li>
                <li><NavLink to="/online-tuition" onClick={() => setIsMobileMenuOpen(false)}>Online Tuition</NavLink></li>
                
                <li className="mobile-dropdown-section">
                  <div 
                    className="mobile-dropdown-header" 
                    onClick={() => setMobileExpandedSection(mobileExpandedSection === 'skills' ? null : 'skills')}
                  >
                    <span>Skill Courses</span>
                    <ChevronDown size={16} className={mobileExpandedSection === 'skills' ? 'rotated' : ''} />
                  </div>
                  {mobileExpandedSection === 'skills' && (
                    <ul className="mobile-submenu">
                      <li><NavLink to="/communication" onClick={() => setIsMobileMenuOpen(false)}>Communication Skills</NavLink></li>
                      <li><NavLink to="/coding-and-programming" onClick={() => setIsMobileMenuOpen(false)}>Coding and Programming</NavLink></li>
                      <li><NavLink to="/language-classes" onClick={() => setIsMobileMenuOpen(false)}>Global Languages</NavLink></li>
                      <li><NavLink to="/reasoning-and-aptitude" onClick={() => setIsMobileMenuOpen(false)}>Reasoning & Aptitude</NavLink></li>
                    </ul>
                  )}
                </li>

                <li><NavLink to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</NavLink></li>
                <li><NavLink to="/careers" onClick={() => setIsMobileMenuOpen(false)}>Careers</NavLink></li>
              </ul>

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
                  href="https://wa.me/919056999005" 
                  className="btn btn-dark btn-full"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} /> Get In Touch!
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
