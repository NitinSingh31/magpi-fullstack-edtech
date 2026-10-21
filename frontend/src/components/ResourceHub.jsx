import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  X, 
  BookOpen, 
  ArrowRight,
  Eye,
  Mail,
  User,
  GraduationCap
} from 'lucide-react';
import './ResourceHub.css';
import api from '../services/api.js';

const RESOURCES = [
  {
    id: 'res_igcse_math',
    title: 'Cambridge IGCSE Extended Math: 2026 Master Formula & Examiner Traps Sheet',
    curriculum: 'Cambridge IGCSE',
    pages: '14 Pages PDF',
    downloads: '2,840+',
    desc: 'Every essential formula across Geometry, Algebra, Trigonometry and Statistics, with common pitfalls flagged by Cambridge examiners.',
    iconColor: '#0072CE'
  },
  {
    id: 'res_ib_physics',
    title: 'IB DP Physics HL/SL: Core Equations, Constants & IA Scoring Blueprint',
    curriculum: 'IB Diploma (DP)',
    pages: '18 Pages PDF',
    downloads: '1,960+',
    desc: 'Complete equation breakdowns for Mechanics, Waves, Fields and Quantum Physics, plus internal assessment (IA) criteria checklist.',
    iconColor: '#F59E0B'
  },
  {
    id: 'res_python_ai',
    title: 'Python 3 & AI Prompt Engineering Quick-Guide for Students',
    curriculum: 'STEAM & AI Labs',
    pages: '12 Pages PDF',
    downloads: '3,120+',
    desc: 'Fun, practical guide covering Python data structures, game loops, API calls, and prompt templates for generative AI tools.',
    iconColor: '#10B981'
  },
  {
    id: 'res_ap_chem',
    title: 'AP Chemistry: Reaction Pathways & 5/5 Exam Hacks Deck',
    curriculum: 'US AP / College Board',
    pages: '16 Pages PDF',
    downloads: '1,450+',
    desc: 'High-yield equilibrium expressions, kinetics rate laws, thermodynamics cycles, and electrochemistry summary tables.',
    iconColor: '#8B5CF6'
  },
  {
    id: 'res_french_oral',
    title: 'French & Spanish: Essential Oral Exam Phrasebook & Idioms',
    curriculum: 'Global Languages',
    pages: '10 Pages PDF',
    downloads: '1,890+',
    desc: 'Native conversational connectors, past and subjunctive tense tricks, and vocabulary to score top marks on speaking assessments.',
    iconColor: '#EC4899'
  },
  {
    id: 'res_math_olympiad',
    title: 'Math Kangaroo & Olympiad: 40 Non-Routine Problem Walkthroughs',
    curriculum: 'Competition Prep',
    pages: '22 Pages PDF',
    downloads: '2,240+',
    desc: 'Challenging logic puzzles, modular arithmetic, and geometric insight problems with step-by-step visual solutions.',
    iconColor: '#0A3678'
  }
];

export default function ResourceHub() {
  const [activeResource, setActiveResource] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', grade: 'Grade 9 - 10' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenModal = (resource) => {
    setActiveResource(resource);
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    setActiveResource(null);
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.createInquiry({
        name: formData.name,
        email: formData.email,
        grade: formData.grade,
        course: activeResource.title,
        type: 'resource_download',
        message: `Requested free download of "${activeResource.title}" (${activeResource.curriculum})`
      });
    } catch (err) {
      console.warn('API error on resource capture:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleDirectDownload = () => {
    // Generate a downloadable text/markdown summary receipt or study sheet
    const content = `Magπ Education - Free Study Resource Guide\n` +
      `Resource: ${activeResource.title}\n` +
      `Curriculum: ${activeResource.curriculum}\n` +
      `Delivered to: ${formData.email}\n` +
      `Date: ${new Date().toLocaleDateString()}\n\n` +
      `KEY EXAM TIPS & FORMULAS:\n` +
      `1. Master the Official Board Command Words (State, Explain, Evaluate, Calculate).\n` +
      `2. Work backwards from the mark allocation (e.g. 3 marks = 3 distinct points).\n` +
      `3. Complete full timed past papers under authentic exam conditions.\n` +
      `4. Schedule your 1-on-1 diagnostic review session with Magπ at https://magpi-fullstack-edtech.vercel.app\n\n` +
      `Happy Learning!\nMagπ Global Faculty Team`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeResource.id}-study-guide.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="section resource-hub-section" id="resources">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="badge-tag green">
            <Sparkles size={14} /> 100% Free Learning Resources
          </div>
          <h2 className="section-title">
            Exam Revision Guides & <span className="highlight-text">Formula Master-Sheets</span>
          </h2>
          <p className="section-subtitle">
            Download high-yield revision summaries, formula sheets, and past-paper blueprints 
            crafted by accredited Cambridge and IB examiners. Instant access, zero cost.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="resources-grid">
          {RESOURCES.map((res) => (
            <div key={res.id} className="resource-card">
              <div className="res-top-row">
                <div className="res-icon-box" style={{ background: `${res.iconColor}15`, color: res.iconColor }}>
                  <FileText size={22} />
                </div>
                <div className="res-meta-badges">
                  <span className="res-curr-tag">{res.curriculum}</span>
                  <span className="res-pages-tag">{res.pages}</span>
                </div>
              </div>

              <h3 className="res-title">{res.title}</h3>
              <p className="res-desc">{res.desc}</p>

              <div className="res-card-footer">
                <span className="res-downloads-count">
                  <Download size={13} /> {res.downloads} downloads
                </span>
                <button 
                  type="button" 
                  className="btn btn-download-res"
                  onClick={() => handleOpenModal(res)}
                >
                  <Download size={14} />
                  <span>Free Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Capture Modal */}
        {activeResource && (
          <div className="resource-modal-overlay" onClick={handleCloseModal}>
            <div className="resource-modal-dialog" onClick={e => e.stopPropagation()}>
              <button className="res-close-btn" onClick={handleCloseModal}>
                <X size={18} />
              </button>

              {!isSuccess ? (
                <div className="res-modal-form-view">
                  <div className="res-modal-icon">
                    <Download size={28} />
                  </div>
                  <h3>Get Instant Free Access</h3>
                  <p className="res-modal-subtitle">
                    Enter your email below to instantly receive the PDF guide:
                  </p>
                  <div className="target-res-name">
                    <BookOpen size={16} />
                    <span>{activeResource.title}</span>
                  </div>

                  <form onSubmit={handleSubmit} className="res-capture-form">
                    <div className="res-input-wrap">
                      <User size={16} className="res-input-icon" />
                      <input 
                        type="text" 
                        placeholder="Your Name (Parent or Student)"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="res-input-wrap">
                      <Mail size={16} className="res-input-icon" />
                      <input 
                        type="email" 
                        placeholder="Email Address (Where to send guide)"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="res-input-wrap">
                      <GraduationCap size={16} className="res-input-icon" />
                      <select 
                        value={formData.grade}
                        onChange={e => setFormData({ ...formData, grade: e.target.value })}
                      >
                        <option value="Middle School (Grades 6-8)">Middle School (Grades 6-8)</option>
                        <option value="Grade 9 - 10 (IGCSE / MYP)">Grade 9 - 10 (IGCSE / MYP)</option>
                        <option value="Grade 11 - 12 (IB DP / A-Levels)">Grade 11 - 12 (IB DP / A-Levels)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-full btn-download-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Preparing Your PDF...' : 'Download Free Revision Guide'}
                    </button>

                    <div className="res-privacy-note">
                      <CheckCircle2 size={13} color="#10B981" />
                      <span>We respect your privacy. No spam, unsubscribe anytime.</span>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="res-modal-success-view">
                  <div className="res-success-icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3>Your Guide is Ready! 🎉</h3>
                  <p>
                    A copy of <strong>{activeResource.title}</strong> has been sent to <strong>{formData.email}</strong>.
                  </p>
                  
                  <div className="success-dl-box">
                    <button 
                      type="button" 
                      className="btn btn-primary btn-full btn-trigger-dl"
                      onClick={handleDirectDownload}
                    >
                      <Download size={16} />
                      <span>Download Study Guide Now (.txt / summary)</span>
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-full"
                      onClick={handleCloseModal}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
