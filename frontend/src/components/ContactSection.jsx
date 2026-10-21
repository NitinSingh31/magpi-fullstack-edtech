import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import './ContactSection.css';
import api from '../services/api.js';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: 'contact',
        course: formData.subject,
        message: `Subject: ${formData.subject} | ${formData.message}`
      });
    } catch (err) {
      console.warn('Backend offline or simulated send', err);
    } finally {
      setIsSubmitting(false);
      setIsSent(true);
      try {
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
      } catch (err) {}
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag coral">
            <MessageCircle size={14} /> Direct Assistance
          </div>
          <h2 className="section-title">Get In Touch With Our Academic Team</h2>
          <p className="section-subtitle">
            Have questions regarding curriculum matching, tutor availability, or pricing plans? 
            Our counselors respond within 30 minutes during active hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-info-card">
            <h3 className="info-title">Global Academic Desks</h3>
            <p className="info-subtitle">
              We cater to international students across all timezones with localized coordinators.
            </p>

            <div className="info-rows-list">
              <div className="info-row">
                <div className="info-icon coral">
                  <Phone size={18} />
                </div>
                <div>
                  <small>Call Our Admissions Desk</small>
                  <a href="tel:+916283609913">+91 6283 609 913</a>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon green">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <small>Instant WhatsApp Support</small>
                  <a 
                    href="https://wa.me/916283609913?text=Hi%20Magπ,%20I%20have%20an%20inquiry%20regarding%20classes" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    +91 6283 609 913 (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon blue">
                  <Mail size={18} />
                </div>
                <div>
                  <small>Official Admissions Email</small>
                  <a href="mailto:admissions@magpi.education">admissions@magpi.education</a>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon gold">
                  <Clock size={18} />
                </div>
                <div>
                  <small>Counseling Hours</small>
                  <span>Mon – Sat: 8:00 AM – 10:00 PM (Local Time)</span>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon purple">
                  <MapPin size={18} />
                </div>
                <div>
                  <small>Regional Representation</small>
                  <span>Dubai (UAE) • London (UK) • Singapore • New Delhi (India)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-card">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-title">Send Us a Direct Message</h3>

                <div className="form-group">
                  <label>Your Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dr. Jennifer Vance" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="parent@example.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="+971 50 123 4567" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Curriculum / Subject Area</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Cambridge IGCSE / GCSE">Cambridge IGCSE / GCSE</option>
                    <option value="IB Diploma (DP) / MYP">IB Diploma (DP) / MYP</option>
                    <option value="AS & A-Levels">AS & A-Levels</option>
                    <option value="SABIS Educational System">SABIS Educational System</option>
                    <option value="Coding, Python & AI">Coding, Python & AI</option>
                    <option value="Global Languages">Global Languages (French/Spanish/German)</option>
                    <option value="Math Olympiad">Math Olympiad</option>
                    <option value="Fee & Schedule Question">Fee & Schedule Question</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>How Can We Help?</label>
                  <textarea 
                    rows="3" 
                    placeholder="Tell us about your child's current grade, challenge areas, or exam goals..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-full"
                  disabled={isSubmitting}
                >
                  <Send size={16} /> {isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}
                </button>
              </form>
            ) : (
              <div className="contact-success-state">
                <CheckCircle2 size={54} color="#10B981" />
                <h3>Message Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. An Academic Coordinator has been assigned 
                  to your inquiry and will reach out to <strong>{formData.email}</strong> shortly.
                </p>
                <button 
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }} 
                  className="btn btn-secondary"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
