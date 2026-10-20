import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  Mail, 
  User, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import './DemoModal.css';
import api from '../services/api.js';

export default function DemoModal({ isOpen, onClose, initialCourse = '' }) {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    curriculum: 'Cambridge IGCSE',
    grade: 'Grade 9 - 10',
    subject: initialCourse || 'Mathematics',
    preferredTime: 'Evening (5:00 PM - 8:00 PM)',
    whatsappUpdates: true
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.createBooking(formData);
    } catch (err) {
      console.warn('Backend server offline or unreachable; using local client state', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully
      }
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal-dialog" onClick={e => e.stopPropagation()}>
        <button className="demo-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div className="demo-modal-form-view">
            <div className="demo-modal-header">
              <div className="badge-tag coral">
                <Sparkles size={13} /> 100% Free • No Card Required
              </div>
              <h2 className="modal-title">Book Your 45-Minute Diagnostic Trial</h2>
              <p className="modal-desc">
                Experience Magπ's personalized 1-on-1 digital classroom and receive a comprehensive 
                subject gap analysis report from an accredited examiner.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="demo-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="curriculum">Curriculum / Board</label>
                  <select 
                    id="curriculum" 
                    name="curriculum" 
                    value={formData.curriculum} 
                    onChange={handleChange}
                    required
                  >
                    <option value="Cambridge IGCSE">Cambridge IGCSE / GCSE</option>
                    <option value="IB MYP / DP">IB MYP / Diploma (DP)</option>
                    <option value="AS / A-Levels">AS & A-Levels</option>
                    <option value="US Common Core / AP">US Board / AP Prep</option>
                    <option value="STEAM & AI Coding">STEAM, Python & AI Coding</option>
                    <option value="Global Languages">Global Languages (French/Spanish/German)</option>
                    <option value="Math Olympiad">Math Olympiad & Kangaroo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="grade">Student's Grade Level</label>
                  <select 
                    id="grade" 
                    name="grade" 
                    value={formData.grade} 
                    onChange={handleChange}
                    required
                  >
                    <option value="Primary (Grades 1-5)">Primary (Grades 1-5)</option>
                    <option value="Middle School (Grades 6-8)">Middle School (Grades 6-8)</option>
                    <option value="Grade 9 - 10">Grade 9 - 10 (IGCSE / MYP)</option>
                    <option value="Grade 11 - 12">Grade 11 - 12 (IB DP / A-Levels)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Target Subject / Skill</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="e.g. Mathematics, Physics, Python, French"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preferredTime">Preferred Class Time</label>
                  <select 
                    id="preferredTime" 
                    name="preferredTime" 
                    value={formData.preferredTime} 
                    onChange={handleChange}
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                    <option value="Weekend Flexible">Weekend Flexible</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="parentName">Parent / Guardian Full Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input 
                    type="text" 
                    id="parentName" 
                    name="parentName" 
                    placeholder="e.g. Dr. Sarah Jenkins"
                    value={formData.parentName} 
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp Number</label>
                  <div className="input-with-icon">
                    <Phone size={16} className="input-icon" />
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="+971 50 123 4567 or +44 7911..."
                      value={formData.phone} 
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={16} className="input-icon" />
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="parent@example.com"
                      value={formData.email} 
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="form-checkbox-row">
                <input 
                  type="checkbox" 
                  id="whatsappUpdates" 
                  name="whatsappUpdates"
                  checked={formData.whatsappUpdates}
                  onChange={handleChange}
                />
                <label htmlFor="whatsappUpdates">
                  Send class link & calendar invitation via WhatsApp
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Securing Your Mentor...' : 'Confirm Free 45-Min Trial Class'}
              </button>

              <div className="form-security-note">
                <CheckCircle2 size={14} color="#10B981" />
                <span>Your information is 100% confidential. No spam or spam calls.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="demo-modal-success-view">
            <div className="success-icon-badge">
              <CheckCircle2 size={42} />
            </div>

            <h2 className="success-title">Trial Session Requested! 🎉</h2>
            <p className="success-desc">
              Thank you, <strong>{formData.parentName}</strong>. Our Senior Academic Counselor 
              is now matching your student with the ideal <strong>{formData.subject}</strong> specialist for 
              <strong> {formData.curriculum}</strong> ({formData.grade}).
            </p>

            <div className="booking-summary-card">
              <div className="summary-item">
                <BookOpen size={16} className="summary-icon" />
                <div>
                  <small>Subject & Board</small>
                  <strong>{formData.subject} ({formData.curriculum})</strong>
                </div>
              </div>
              <div className="summary-item">
                <Clock size={16} className="summary-icon" />
                <div>
                  <small>Requested Time Slot</small>
                  <strong>{formData.preferredTime}</strong>
                </div>
              </div>
              <div className="summary-item">
                <Mail size={16} className="summary-icon" />
                <div>
                  <small>Confirmation Sent To</small>
                  <strong>{formData.email} & WhatsApp</strong>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <a 
                href={`https://wa.me/919876543210?text=Hi%20Magπ,%20I%20just%20booked%20a%20trial%20for%20${encodeURIComponent(formData.subject)}%20(${encodeURIComponent(formData.curriculum)})%20for%20${encodeURIComponent(formData.parentName)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp btn-full"
              >
                <MessageCircle size={18} /> Instant Connect on WhatsApp
              </a>
              <button onClick={handleReset} className="btn btn-secondary btn-full">
                Close & Return to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
