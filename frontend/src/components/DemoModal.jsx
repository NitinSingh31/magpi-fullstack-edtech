import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  Download,
  CalendarCheck,
  ShieldCheck,
  Award
} from 'lucide-react';
import './DemoModal.css';
import api from '../services/api.js';

export default function DemoModal({ isOpen, onClose, initialCourse = '' }) {
  // Tomorrow's date in YYYY-MM-DD
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const todayStr = new Date().toISOString().split('T')[0];

  // Parse tutor if passed (e.g. "Mathematics with Dr. Jonathan Vance")
  let defaultSubject = 'Mathematics';
  let defaultTutor = '';
  if (initialCourse) {
    if (initialCourse.includes(' with ')) {
      const parts = initialCourse.split(' with ');
      defaultSubject = parts[0];
      defaultTutor = parts[1]?.split('(')[0]?.trim() || '';
    } else {
      defaultSubject = initialCourse;
    }
  }

  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    curriculum: 'Cambridge IGCSE',
    grade: 'Grade 9 - 10',
    subject: defaultSubject,
    preferredDate: tomorrowStr,
    preferredTime: '05:00 PM - 05:45 PM (Prime Evening)',
    tutorPreference: defaultTutor,
    whatsappUpdates: true
  });

  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialCourse) {
      if (initialCourse.includes(' with ')) {
        const parts = initialCourse.split(' with ');
        setFormData(prev => ({
          ...prev,
          subject: parts[0],
          tutorPreference: parts[1]?.split('(')[0]?.trim() || ''
        }));
      } else {
        setFormData(prev => ({ ...prev, subject: initialCourse }));
      }
    }
  }, [initialCourse]);

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

    const generatedRef = `MAG-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(generatedRef);

    try {
      await api.createBooking({
        ...formData,
        referenceCode: generatedRef
      });
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

  // Google Calendar Link Generator
  const getGoogleCalendarUrl = () => {
    const dateFormatted = formData.preferredDate.replace(/-/g, '');
    const startTime = '170000Z';
    const endTime = '174500Z';
    const title = encodeURIComponent(`Magπ 1-on-1 Trial Class: ${formData.subject}`);
    const details = encodeURIComponent(
      `Personalized 45-minute diagnostic session with accredited board specialist.\n` +
      `Reference ID: ${bookingRef}\n` +
      `Curriculum: ${formData.curriculum} (${formData.grade})\n` +
      `Student Name: ${formData.parentName}\n` +
      `Meeting link will be dispatched via WhatsApp/Email before session.`
    );
    const location = encodeURIComponent('Online HD Classroom (Google Meet)');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateFormatted}T${startTime}/${dateFormatted}T${endTime}&details=${details}&location=${location}`;
  };

  // .ics Calendar File Download
  const handleDownloadICS = () => {
    const dateClean = formData.preferredDate.replace(/-/g, '');
    const icsContent = 
      `BEGIN:VCALENDAR\n` +
      `VERSION:2.0\n` +
      `PRODID:-//Magπ Education//1-on-1 Diagnostic Trial//EN\n` +
      `CALSCALE:GREGORIAN\n` +
      `METHOD:PUBLISH\n` +
      `BEGIN:VEVENT\n` +
      `UID:${bookingRef}@magpi.education\n` +
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n` +
      `DTSTART:${dateClean}T170000Z\n` +
      `DTEND:${dateClean}T174500Z\n` +
      `SUMMARY:Magπ 1-on-1 Trial Class - ${formData.subject}\n` +
      `DESCRIPTION:Diagnostic session for ${formData.curriculum} (${formData.grade}). Reference: ${bookingRef}\n` +
      `LOCATION:Online HD Classroom (Google Meet)\n` +
      `STATUS:CONFIRMED\n` +
      `END:VEVENT\n` +
      `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `magpi-trial-${bookingRef}.ics`;
    link.click();
    URL.revokeObjectURL(url);
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
                subject gap analysis report from an accredited board examiner.
              </p>
              {formData.tutorPreference && (
                <div className="matched-tutor-banner">
                  <Award size={15} />
                  <span>Matching with preferred mentor: <strong>{formData.tutorPreference}</strong></span>
                </div>
              )}
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
                  <label htmlFor="subject">Target Subject / Topic</label>
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
                  <label htmlFor="preferredDate">Preferred Date</label>
                  <input 
                    type="date" 
                    id="preferredDate" 
                    name="preferredDate" 
                    value={formData.preferredDate}
                    min={todayStr}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="preferredTime">Select 45-Minute Class Slot</label>
                <select 
                  id="preferredTime" 
                  name="preferredTime" 
                  value={formData.preferredTime} 
                  onChange={handleChange}
                >
                  <option value="10:00 AM - 10:45 AM (Morning Slot)">10:00 AM - 10:45 AM (Morning Slot)</option>
                  <option value="02:00 PM - 02:45 PM (Afternoon Slot)">02:00 PM - 02:45 PM (Afternoon Slot)</option>
                  <option value="05:00 PM - 05:45 PM (Prime Evening)">05:00 PM - 05:45 PM (Prime Evening)</option>
                  <option value="07:00 PM - 07:45 PM (Late Evening)">07:00 PM - 07:45 PM (Late Evening)</option>
                  <option value="08:30 PM - 09:15 PM (Night / International)">08:30 PM - 09:15 PM (Night / International)</option>
                </select>
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
                <ShieldCheck size={14} color="#10B981" />
                <span>Your information is 100% confidential. No spam calls or lock-in obligations.</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="demo-modal-success-view">
            <div className="success-icon-badge">
              <CheckCircle2 size={42} />
            </div>

            <div className="success-ref-pill">
              Reference ID: <strong>{bookingRef}</strong>
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
                <Calendar size={16} className="summary-icon" />
                <div>
                  <small>Scheduled Slot</small>
                  <strong>{formData.preferredDate} • {formData.preferredTime}</strong>
                </div>
              </div>
              <div className="summary-item">
                <Mail size={16} className="summary-icon" />
                <div>
                  <small>Confirmation Dispatched</small>
                  <strong>{formData.email} & WhatsApp</strong>
                </div>
              </div>
            </div>

            {/* Calendar Actions */}
            <div className="calendar-actions-row">
              <a 
                href={getGoogleCalendarUrl()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-cal-action"
              >
                <CalendarCheck size={15} />
                <span>Add to Google Calendar</span>
              </a>
              <button 
                type="button" 
                onClick={handleDownloadICS} 
                className="btn-cal-action"
              >
                <Download size={15} />
                <span>Download .ics Invite</span>
              </button>
            </div>

            <div className="success-actions">
              <a 
                href={`https://wa.me/916283609913?text=Hi%20Mag%CF%80,%20I%20just%20booked%20a%20trial%20for%20${encodeURIComponent(formData.subject)}%20(${encodeURIComponent(formData.curriculum)})%20for%20${encodeURIComponent(formData.parentName)}.%20Ref:%20${bookingRef}`}
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
