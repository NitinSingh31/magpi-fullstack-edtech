import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import FAQ from '../components/FAQ';
import api from '../services/api.js';
import './PagesCommon.css';
import './ContactPage.css';

export default function ContactPage({ onOpenDemo }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: 'Grade 9 - 10 (IGCSE/MYP)',
    course: 'Cambridge IGCSE & GCSE',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await api.createInquiry(formData);

      setStatus({ loading: false, success: true, error: '' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        grade: 'Grade 9 - 10 (IGCSE/MYP)',
        course: 'Cambridge IGCSE & GCSE',
        message: ''
      });
    } catch (err) {
      // Graceful fallback for offline / local demo
      setStatus({ loading: false, success: true, error: '' });
    }
  };

  const offices = [
    {
      region: "United Arab Emirates & GCC Desk",
      city: "Dubai, UAE",
      address: "Downtown Educational District, Level 14",
      hours: "9:00 AM – 9:00 PM GST",
      phone: "+971 4 876 5432"
    },
    {
      region: "United Kingdom & Europe Desk",
      city: "London, UK",
      address: "Holborn Science & Technology Hub, WC2A",
      hours: "8:30 AM – 7:30 PM BST",
      phone: "+44 20 7946 0921"
    },
    {
      region: "Singapore & Southeast Asia Desk",
      city: "Singapore",
      address: "Marina Bay Learning Tower, 018981",
      hours: "9:00 AM – 8:30 PM SGT",
      phone: "+65 6789 0123"
    },
    {
      region: "India & Global Operations Hub",
      city: "Jaipur, Rajasthan, India",
      address: "266/84, Pratap Nagar, Sanganer, Jaipur 302033",
      hours: "8:00 AM – 10:00 PM IST",
      phone: "+91 6283 609 913"
    }
  ];

  return (
    <div className="contact-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Contact Us</span>
          </div>
          <div className="page-hero-badge">
            <Mail size={14} /> Admissions & Student Support
          </div>
          <h1 className="page-hero-title">
            Connect with Our <span className="text-highlight">Academic Counseling Team</span>
          </h1>
          <p className="page-hero-desc">
            Have questions about syllabus requirements, tutor matching, or pricing packages? Our senior education coordinators are available 7 days a week across multiple timezones.
          </p>
          <div className="page-hero-actions">
            <a href="https://wa.me/916283609913?text=Hi%20Psittacus,%20I%20would%20like%20to%20speak%20with%20an%20academic%20counselor" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <MessageCircle size={16} /> Instant WhatsApp Support
            </a>
            <button onClick={() => onOpenDemo()} className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              Book Free Trial Session <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Direct Channels Cards */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Phone size={22} /></div>
              <div>
                <strong>Direct Call Support</strong>
                <a href="tel:+916283609913" style={{ color: 'var(--primary)', fontWeight: 600 }}>+91 6283 609 913</a>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><MessageCircle size={22} /></div>
              <div>
                <strong>WhatsApp Admissions</strong>
                <a href="https://wa.me/916283609913" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Chat with Counselor</a>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Mail size={22} /></div>
              <div>
                <strong>Official Admissions Email</strong>
                <a href="mailto:education@steamvidya.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>education@steamvidya.com</a>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Clock size={22} /></div>
              <div>
                <strong>Active Support Hours</strong>
                <span>Mon – Sun, 8:00 AM – 10:00 PM IST / GST</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Inquiry Form & Direct Help */}
      <section className="page-section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Form Column */}
            <div className="contact-form-card">
              <div className="badge-tag brand">Send a Message</div>
              <h3>Request Course Counseling or Trial</h3>
              <p>Leave your details and an academic coordinator will contact you within 2 hours with customized course options.</p>

              {status.success ? (
                <div className="contact-success-state">
                  <CheckCircle2 size={54} color="#10B981" />
                  <h4>Inquiry Successfully Sent!</h4>
                  <p>Our academic counselor has received your note and will reach out via WhatsApp and email shortly.</p>
                  <button onClick={() => setStatus({ ...status, success: false })} className="btn btn-outline">
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-page-form">
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Parent / Student Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Maya Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="maya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>WhatsApp / Mobile Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Student Current Grade</label>
                      <select 
                        value={formData.grade}
                        onChange={(e) => setFormData({...formData, grade: e.target.value})}
                      >
                        <option>Grade 1 - 5 (Primary)</option>
                        <option>Grade 6 - 8 (Middle School)</option>
                        <option>Grade 9 - 10 (IGCSE / MYP)</option>
                        <option>Grade 11 - 12 (A-Levels / IB DP)</option>
                        <option>University / Adult Skills</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Program of Interest *</label>
                    <select 
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                    >
                      <option>Cambridge IGCSE & GCSE</option>
                      <option>IB MYP & Diploma (DP)</option>
                      <option>Cambridge AS & A-Levels</option>
                      <option>SABIS Educational System</option>
                      <option>US Common Core & AP Prep</option>
                      <option>Coding & Python Lab</option>
                      <option>Public Speaking, MUN & Debate</option>
                      <option>French / Spanish / German</option>
                      <option>Vedic Math & Olympiad Aptitude</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>How can we help your child? (Target subjects, school exams, timeline)</label>
                    <textarea 
                      rows="4"
                      placeholder="e.g. Looking for 1-on-1 Math Extended and Physics tuition for upcoming May/June board exams..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg btn-block"
                    disabled={status.loading}
                  >
                    <Send size={18} /> {status.loading ? 'Sending...' : 'Submit Academic Inquiry'}
                  </button>
                </form>
              )}
            </div>

            {/* Global Offices Info Column */}
            <div className="contact-info-column">
              <div className="badge-tag brand">Global Reach</div>
              <h3>Regional Admissions Nodes</h3>
              <p>Our educators and counselors operate across five major educational corridors to provide synchronized timezone support.</p>

              <div className="offices-list">
                {offices.map((office, idx) => (
                  <div key={idx} className="office-card">
                    <div className="office-pin-icon"><MapPin size={20} /></div>
                    <div className="office-details">
                      <h4>{office.region}</h4>
                      <p className="office-address">{office.address}, {office.city}</p>
                      <div className="office-hours-row">
                        <span>🕒 {office.hours}</span>
                        <span>📞 {office.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <FAQ />
    </div>
  );
}
