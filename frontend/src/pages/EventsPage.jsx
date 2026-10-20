import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UPCOMING_EVENTS } from '../data/coursesData';
import { 
  Calendar, 
  Clock, 
  User, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Video, 
  Play, 
  Users, 
  Award,
  Globe2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './PagesCommon.css';
import './EventsPage.css';

export default function EventsPage({ onOpenDemo }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvent, setRegisteredEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', grade: 'Grade 9 - 10' });

  // Additional rich events for the dedicated events page
  const allEvents = [
    ...UPCOMING_EVENTS,
    {
      id: 'mun-debate-masterclass',
      category: 'communication',
      title: 'Model United Nations (MUN): Drafting Winning Position Papers',
      badge: 'Debate & MUN',
      type: 'Live Interactive Workshop',
      date: 'Next Saturday',
      time: '6:00 PM GST (Dubai) / 7:30 PM IST',
      speaker: 'Sarah Jenkins (Harvard MUN Best Delegate Alum)',
      seatsLeft: 7,
      description: 'Learn the exact rhetorical structures and resolution draft techniques that win "Best Delegate" gavels in international MUN conferences.'
    },
    {
      id: 'python-ai-showcase',
      category: 'coding',
      title: 'Building Your First Machine Learning Model in Python',
      badge: 'Coding & AI',
      type: 'Hands-on Coding Lab',
      date: 'Next Sunday',
      time: '5:00 PM BST (London) / 8:00 PM GST',
      speaker: 'Liam Chen (Ex-Senior AI Engineer)',
      seatsLeft: 5,
      description: 'A 90-minute live coding masterclass where students write clean Python code to train a computer vision model from scratch.'
    },
    {
      id: 'french-pronunciation-clinic',
      category: 'languages',
      title: 'French DELF A2/B1: Conversational Accent & Oral Fluency',
      badge: 'Global Languages',
      type: 'Language Immersion',
      date: 'Upcoming Tuesday',
      time: '6:30 PM GST / 8:00 PM IST',
      speaker: 'Madame Claire Dubois (Native French Examiner)',
      seatsLeft: 6,
      description: 'Master French phonetics, liaison rules, and impromptu conversation strategies for DELF Junior exam excellence.'
    }
  ];

  const pastWebinars = [
    {
      title: 'Cracking Cambridge IGCSE Extended Math Paper 4: 90+ Score Blueprint',
      speaker: 'Dr. Elena Vance',
      duration: '58 mins',
      views: '4,280 views',
      tag: 'Mathematics'
    },
    {
      title: 'How to Choose Your IB DP Subjects: HL vs SL Strategy for Ivy League',
      speaker: 'Marcus Thorne',
      duration: '45 mins',
      views: '3,850 views',
      tag: 'IB Diploma'
    },
    {
      title: 'Overcoming Stage Fright: 5 Vocal Techniques for School Assemblies',
      speaker: 'Sarah Jenkins',
      duration: '42 mins',
      views: '2,940 views',
      tag: 'Public Speaking'
    }
  ];

  const filteredEvents = selectedCategory === 'all'
    ? allEvents
    : allEvents.filter(e => {
        if (selectedCategory === 'academic') return e.id.includes('math') || e.id.includes('science') || e.id.includes('caie') || e.id.includes('ib');
        if (selectedCategory === 'coding') return e.id.includes('python') || e.id.includes('coding');
        if (selectedCategory === 'communication') return e.id.includes('mun') || e.id.includes('debate');
        if (selectedCategory === 'languages') return e.id.includes('french') || e.id.includes('language');
        return true;
      });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisteredEvent(selectedEvent);
    setSelectedEvent(null);

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}
  };

  return (
    <div className="events-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Events & Masterclasses</span>
          </div>
          <div className="page-hero-badge">
            <Calendar size={14} /> Live Workshops & Masterclasses
          </div>
          <h1 className="page-hero-title">
            Learn from Global Examiners & <span className="text-highlight">Industry Leaders</span>
          </h1>
          <p className="page-hero-desc">
            Participate in high-impact live webinars, past-paper walkthroughs, and skill workshops. Interactive Q&A included, 100% free for all registered students and parents.
          </p>
          <div className="page-hero-actions">
            <a href="#upcoming-schedule" className="btn btn-primary">
              <Sparkles size={16} /> View Upcoming Schedule
            </a>
            <button onClick={() => onOpenDemo()} className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              Book 1-on-1 Trial Instead <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Feature Strip */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Video size={22} /></div>
              <div>
                <strong>Live HD Interactive Streaming</strong>
                <span>Direct 2-way microphone & chat interaction with speaker</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Award size={22} /></div>
              <div>
                <strong>Verified Certificate of Attendance</strong>
                <span>Awarded to students attending live sessions</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Users size={22} /></div>
              <div>
                <strong>Curated Small Capacities</strong>
                <span>Strictly capped attendance to preserve Q&A quality</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Globe2 size={22} /></div>
              <div>
                <strong>Dual Timezone Broadcasts</strong>
                <span>Scheduled for Gulf (GST), Europe (BST/CET), and Asia (IST)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Upcoming Events Section */}
      <section id="upcoming-schedule" className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Live Schedule</div>
            <h2>Upcoming Masterclasses</h2>
            <p>
              Reserve your seat for upcoming live sessions. Seats fill rapidly due to attendance caps.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="events-filter-bar">
            <button 
              className={`filter-pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Masterclasses
            </button>
            <button 
              className={`filter-pill-btn ${selectedCategory === 'academic' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('academic')}
            >
              Board Academics (IGCSE/IB)
            </button>
            <button 
              className={`filter-pill-btn ${selectedCategory === 'coding' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('coding')}
            >
              Coding & AI Lab
            </button>
            <button 
              className={`filter-pill-btn ${selectedCategory === 'communication' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('communication')}
            >
              Public Speaking & MUN
            </button>
            <button 
              className={`filter-pill-btn ${selectedCategory === 'languages' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('languages')}
            >
              Languages Immersion
            </button>
          </div>

          {/* Events Grid */}
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-top-strip">
                  <span className="event-type-badge">{event.type}</span>
                  <span className="event-board-pill">{event.badge}</span>
                </div>

                <h3 className="event-title">{event.title}</h3>
                <p className="event-desc">{event.description}</p>

                <div className="event-meta-list">
                  <div className="event-meta-item">
                    <Calendar size={15} className="meta-icon" />
                    <span>{event.date}</span>
                  </div>
                  <div className="event-meta-item">
                    <Clock size={15} className="meta-icon" />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-meta-item">
                    <User size={15} className="meta-icon" />
                    <span>{event.speaker}</span>
                  </div>
                </div>

                <div className="event-card-footer">
                  <div className="seats-indicator">
                    <span className="seats-dot"></span>
                    <small>Only {event.seatsLeft} seats left</small>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(event)} 
                    className="btn btn-primary btn-sm"
                  >
                    <Sparkles size={14} /> Register Free
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Past Masterclasses Video Archives */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">On Demand Replays</div>
            <h2>Recorded Masterclasses & Highlights</h2>
            <p>
              Missed a previous live workshop? Explore on-demand recordings of past masterclasses.
            </p>
          </div>

          <div className="past-webinars-grid">
            {pastWebinars.map((webinar, idx) => (
              <div key={idx} className="webinar-card">
                <div className="webinar-thumb">
                  <div className="play-button-overlay">
                    <Play size={24} fill="#FFFFFF" color="#FFFFFF" />
                  </div>
                  <span className="webinar-duration">{webinar.duration}</span>
                </div>
                <div className="webinar-info">
                  <span className="webinar-tag">{webinar.tag}</span>
                  <h4>{webinar.title}</h4>
                  <div className="webinar-meta">
                    <span>By {webinar.speaker}</span>
                    <span>•</span>
                    <span>{webinar.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. School Workshop Partnership CTA */}
      <section className="page-section">
        <div className="container">
          <div className="school-partnership-card">
            <div className="partnership-content">
              <span className="badge-tag brand">For Schools & Educators</span>
              <h3>Want Magπ Faculty to Host a Workshop for Your School?</h3>
              <p>
                We collaborate with international schools across the UAE, Singapore, UK, and India to deliver guest masterclasses on exam decoding, STEM robotics, and MUN debate training.
              </p>
              <Link to="/contact-us" className="btn btn-primary">
                Request a School Workshop <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEvent(null)}>
              <X size={20} />
            </button>

            <div className="event-modal-header">
              <span className="badge-tag gold">Free Registration</span>
              <h3>Reserve Seat: {selectedEvent.title}</h3>
              <p>Session with <strong>{selectedEvent.speaker}</strong> on <strong>{selectedEvent.date} ({selectedEvent.time})</strong>.</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="event-form">
              <div className="form-group">
                <label>Student / Parent Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Email Address (For Zoom/Meet link) *</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Student Grade</label>
                  <select 
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  >
                    <option>Grade 6 - 8</option>
                    <option>Grade 9 - 10 (IGCSE/MYP)</option>
                    <option>Grade 11 - 12 (A-Levels/IB DP)</option>
                    <option>Parent / Educator</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <Sparkles size={16} /> Confirm Free Seat
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {registeredEvent && (
        <div className="event-modal-overlay" onClick={() => setRegisteredEvent(null)}>
          <div className="event-modal-dialog success-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-wrapper">
              <CheckCircle2 size={48} color="#10B981" />
            </div>
            <h3>Seat Confirmed!</h3>
            <p>
              You are registered for <strong>{registeredEvent.title}</strong>. 
              The meeting link and pre-session workbook have been sent to your email and WhatsApp.
            </p>
            <button onClick={() => setRegisteredEvent(null)} className="btn btn-primary">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
