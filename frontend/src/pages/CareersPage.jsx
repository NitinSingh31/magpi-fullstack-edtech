import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  Globe2, 
  Laptop, 
  Send, 
  FileText, 
  Users, 
  Award,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../services/api.js';
import './PagesCommon.css';
import './CareersPage.css';

const DEFAULT_ROLES = [
  {
    title: "Cambridge IGCSE & A-Level Mathematics Faculty",
    type: "Part-time / Full-time Remote",
    location: "Global (Remote)",
    compensation: "$35 - $65 / hr",
    boards: "CAIE 0580/0607, Edexcel 4MA1, Pure Math P1-P3, Mechanics",
    requirements: "Minimum 4+ years verified IGCSE/A-Level teaching experience. Examiner experience preferred."
  },
  {
    title: "IB Diploma Physics & Chemistry Specialist (HL)",
    type: "Remote Flexible",
    location: "Global (Remote)",
    compensation: "$40 - $70 / hr",
    boards: "IB DP Physics HL & Chemistry HL, IA Mentorship",
    requirements: "Demonstrated track record of guiding students to 6/7 in IB DP. In-depth familiarity with Internal Assessment rubrics."
  },
  {
    title: "Python, AI & Robotics Mentor for Kids",
    type: "Remote Flexible",
    location: "Global (Remote)",
    compensation: "$30 - $55 / hr",
    boards: "Scratch, Python, Pygame, Web Dev, OpenCV",
    requirements: "Passionate CS graduate or developer with exceptional communication skills and enthusiasm for mentoring kids aged 8-16."
  },
  {
    title: "Native French / Spanish Language Educator",
    type: "Remote Flexible",
    location: "Global (Remote)",
    compensation: "$30 - $50 / hr",
    boards: "CEFR A1-B2, DELF Prim/Junior, DELE, IB French/Spanish B",
    requirements: "Native fluency in French or Spanish. Prior experience preparing students for official CEFR or board language exams."
  },
  {
    title: "Public Speaking, MUN & Debate Coach",
    type: "Remote Flexible",
    location: "Global (Remote)",
    compensation: "$35 - $60 / hr",
    boards: "WSDC Parliamentary Debate, Harvard MUN, Oratory",
    requirements: "Former university competitive debater or MUN Best Delegate winner with coaching credentials for youth."
  }
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [openRoles, setOpenRoles] = useState(DEFAULT_ROLES);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Cambridge IGCSE & A-Level Math',
    experience: '5+ Years',
    qualification: '',
    linkedin: '',
    rate: '',
    notes: ''
  });

  useEffect(() => {
    let isMounted = true;
    const fetchOpenRoles = async () => {
      try {
        const res = await api.getCareerOpenings({ activeOnly: true });
        if (isMounted && res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setOpenRoles(res.data);
        }
      } catch (err) {
        console.warn('Could not load live career openings, showing defaults:', err.message);
      }
    };
    fetchOpenRoles();
    return () => { isMounted = false; };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}
  };

  return (
    <div className="careers-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="active">Careers</span>
          </div>
          <div className="page-hero-badge">
            <Briefcase size={14} /> Join Global Faculty
          </div>
          <h1 className="page-hero-title">
            Teach What You Love, <span className="text-highlight">From Wherever You Are</span>
          </h1>
          <p className="page-hero-desc">
            Join Magπ’s elite faculty of international educators, curriculum directors, and subject specialists. Teach motivated students across global boards with high hourly compensation, total schedule autonomy, and full administrative support.
          </p>
          <div className="page-hero-actions">
            <a href="#open-positions" className="btn btn-primary">
              <Sparkles size={16} /> View Open Positions
            </a>
            <a href="#apply-now" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              Direct Application Form <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Feature Strip */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Globe2 size={22} /></div>
              <div>
                <strong>100% Remote Global Freedom</strong>
                <span>Teach students from Dubai, London, Singapore & California</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><DollarSign size={22} /></div>
              <div>
                <strong>Premium Competitive Pay</strong>
                <span>Direct bi-weekly bank payouts with zero delay</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Clock size={22} /></div>
              <div>
                <strong>Flexible Teaching Hours</strong>
                <span>Set your own calendar availability and capacity</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Laptop size={22} /></div>
              <div>
                <strong>White-Glove Tech & Admin Support</strong>
                <span>We handle billing, rescheduling, and parent coordination</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Open Positions */}
      <section id="open-positions" className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Current Vacancies</div>
            <h2>Open Faculty Positions</h2>
            <p>
              We are actively expanding our faculty for the 2026-27 academic term. Select an opening to apply.
            </p>
          </div>

          <div className="roles-list-container">
            {openRoles.map((role, idx) => (
              <div key={idx} className="role-card">
                <div className="role-main-info">
                  <span className="role-type-tag">{role.type}</span>
                  <h3 className="role-title">{role.title}</h3>
                  <div className="role-meta-row">
                    <span>📍 {role.location}</span>
                    <span>💰 {role.compensation}</span>
                    <span>🎯 {role.boards}</span>
                  </div>
                  <p className="role-reqs">{role.requirements}</p>
                </div>

                <div className="role-action-box">
                  <a 
                    href="#apply-now" 
                    onClick={() => {
                      setSelectedRole(role.title);
                      setFormData({...formData, subject: role.title});
                    }}
                    className="btn btn-primary"
                  >
                    Apply for Role <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tutor Application Form Section */}
      <section id="apply-now" className="page-section alt-bg">
        <div className="container">
          <div className="application-box-wrapper">
            <div className="page-section-header">
              <div className="badge-tag brand">Faculty Application</div>
              <h2>Submit Your Educator Profile</h2>
              <p>
                Fill out the application below. Our academic dean reviews profiles within 48 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="application-success-box">
                <CheckCircle2 size={54} color="#10B981" />
                <h3>Application Successfully Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>. Our academic recruitment coordinator has received your credentials. If your profile matches our requirements, we will invite you for a 20-minute pedagogical discussion and demo session.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="tutor-application-form">
                {selectedRole && (
                  <div className="selected-role-notice">
                    Applying for: <strong>{selectedRole}</strong>
                  </div>
                )}

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Full Legal Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Dr. Arthur Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="arthur@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>WhatsApp / Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+44 7911 123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Years of Teaching Experience *</label>
                    <select 
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    >
                      <option>3 - 5 Years</option>
                      <option>5 - 8 Years</option>
                      <option>8 - 12 Years</option>
                      <option>12+ Years (Senior Examiner)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Highest Academic Degree & Alma Mater *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. M.Sc. Mathematics, Cambridge University"
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn or Online Portfolio Link</label>
                    <input 
                      type="url" 
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Curriculums & Subjects You Excel In *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Cambridge IGCSE 0580, IB Math AA HL, AP Calculus BC"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Why do you want to teach with Magπ? (Brief Statement)</label>
                  <textarea 
                    rows="3"
                    placeholder="Tell us about your teaching philosophy and how you help students grasp difficult concepts..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  <Send size={18} /> Submit Faculty Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
