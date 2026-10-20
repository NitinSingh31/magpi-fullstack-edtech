import React, { useState } from 'react';
import { UPCOMING_EVENTS } from '../data/coursesData';
import { Calendar, Clock, User, Sparkles, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import './EventsSection.css';

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredEvent, setRegisteredEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', grade: 'Grade 9 - 10' });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisteredEvent(selectedEvent);
    setSelectedEvent(null);

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}
  };

  return (
    <section className="section events-section" id="events">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag gold">
            <Calendar size={14} /> Masterclasses & Workshops
          </div>
          <h2 className="section-title">
            Upcoming Free Masterclasses & Webinars
          </h2>
          <p className="section-subtitle">
            Join live interactive sessions led by senior examiners and curriculum specialists. 
            Free for all registered students and parents.
          </p>
        </div>

        <div className="events-grid">
          {UPCOMING_EVENTS.map((event) => (
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

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEvent(null)}>
              <X size={20} />
            </button>

            <div className="event-modal-header">
              <span className="badge-tag gold">Free Registration</span>
              <h3>{selectedEvent.title}</h3>
              <p className="event-modal-time">
                <Calendar size={14} /> {selectedEvent.date} • {selectedEvent.time}
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="event-modal-form">
              <div className="form-group">
                <label>Student / Parent Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. David Miller" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email Address (For Zoom Link)</label>
                <input 
                  type="email" 
                  placeholder="parent@example.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone / WhatsApp Number</label>
                <input 
                  type="tel" 
                  placeholder="+971 50 123 4567 or +44 7911..." 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Confirm Free Seat
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Registered Success Confirmation Alert */}
      {registeredEvent && (
        <div className="event-modal-overlay" onClick={() => setRegisteredEvent(null)}>
          <div className="event-modal-dialog success-box" onClick={(e) => e.stopPropagation()}>
            <CheckCircle2 size={48} color="#10B981" />
            <h3>Seat Reserved Successfully!</h3>
            <p>
              We have sent the event calendar invite and Zoom joining link to your email and WhatsApp for <strong>{registeredEvent.title}</strong>.
            </p>
            <button onClick={() => setRegisteredEvent(null)} className="btn btn-secondary">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
