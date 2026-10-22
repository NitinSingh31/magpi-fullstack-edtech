import React, { useState } from 'react';
import { Briefcase, CheckCircle2, Sparkles, Send, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import './CareersSection.css';

export default function CareersSection() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Mathematics (IB / IGCSE)',
    experience: '3 - 5 Years',
    degree: "Master's Degree",
    note: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}
  };

  return (
    <section className="section careers-section" id="careers">
      <div className="container">
        <div className="careers-card-banner">
          <div className="careers-content">
            <div className="badge-tag gold">
              <Briefcase size={14} /> Join Our Global Faculty
            </div>
            <h2 className="careers-title">
              Passionate About Teaching? Join Magπ’s Elite Network
            </h2>
            <p className="careers-description">
              We are constantly seeking brilliant educators, former examiners, and university scholars 
              to mentor curious minds worldwide. Enjoy flexible remote hours, competitive international 
              hourly rates, and world-class digital tools.
            </p>

            <div className="careers-perks-list">
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <span>Competitive Global Rates (USD / GBP / AED)</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <span>Teach motivated students from UAE, UK, US & Singapore</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={18} className="perk-icon" />
                <span>Smart digital whiteboard & solved past paper resources provided</span>
              </div>
            </div>

            <button 
              onClick={() => { setIsApplyOpen(true); setIsSubmitted(false); }} 
              className="btn btn-primary btn-lg careers-btn"
            >
              <Sparkles size={18} /> Apply as a Tutor
            </button>
          </div>
        </div>
      </div>

      {/* Tutor Application Modal */}
      {isApplyOpen && (
        <div className="careers-modal-overlay" onClick={() => setIsApplyOpen(false)}>
          <div className="careers-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsApplyOpen(false)}>
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="careers-modal-header">
                  <span className="badge-tag coral">Tutor Application</span>
                  <h3>Join the Magπ Faculty</h3>
                  <p>Share your credentials and subject expertise with our recruitment committee.</p>
                </div>

                <form onSubmit={handleSubmit} className="careers-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Dr. Arthur Miller" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        placeholder="tutor@example.com" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone / WhatsApp</label>
                      <input 
                        type="tel" 
                        placeholder="+91 90569 99005" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Subject Specialization</label>
                      <input 
                        type="text" 
                        placeholder="e.g. IB Math AA HL, IGCSE Physics" 
                        required 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Highest Qualification</label>
                      <select 
                        value={formData.degree} 
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      >
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Ph.D. / Doctorate">Ph.D. / Doctorate</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Teaching Experience</label>
                      <select 
                        value={formData.experience} 
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      >
                        <option value="1 - 2 Years">1 - 2 Years</option>
                        <option value="3 - 5 Years">3 - 5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                        <option value="10+ Years / Senior Examiner">10+ Years / Senior Examiner</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>LinkedIn / Portfolio / CV Summary</label>
                    <textarea 
                      rows="3" 
                      placeholder="Brief summary of your teaching background, boards taught, or LinkedIn URL..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-full">
                    <Send size={16} /> Submit Faculty Application
                  </button>
                </form>
              </>
            ) : (
              <div className="careers-success-view">
                <CheckCircle2 size={54} color="#10B981" />
                <h3>Application Received!</h3>
                <p>
                  Thank you for your interest in joining Magπ. Our Academic Dean and Faculty Selection 
                  Board will review your credentials and contact you within 48 hours for a mock teaching simulation.
                </p>
                <button onClick={() => setIsApplyOpen(false)} className="btn btn-secondary">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
