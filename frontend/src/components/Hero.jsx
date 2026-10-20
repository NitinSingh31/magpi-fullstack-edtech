import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Users, 
  Zap,
  TrendingUp,
  Video
} from 'lucide-react';
import './Hero.css';

export default function Hero({ onOpenDemo }) {
  return (
    <section className="hero-section" id="about">
      {/* Background Ambient Glow Elements */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="container hero-container">
        {/* Left Column: Copy & CTAs */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span className="badge-text">
              <Sparkles size={14} className="badge-icon" /> Personalized 1-on-1 Global Tuition & Future Skills
            </span>
          </div>

          <h1 className="hero-title">
            Personalized Online Tuitions for <span className="highlight-text">IGCSE / IB</span> & Future Skills<span className="pi-symbol">π</span>
          </h1>

          <p className="hero-description">
            Experience bespoke 1-on-1 and small group live online learning tailored to your child’s target board. 
            From mastering <strong>Cambridge IGCSE</strong>, <strong>IB Diploma</strong>, and <strong>SABIS</strong> to building real-world 
            <strong> Python & AI</strong> projects, our top 1% certified educators deliver measurable grade elevation.
          </p>

          <div className="hero-cta-group">
            <button 
              onClick={() => onOpenDemo()}
              className="btn btn-primary btn-lg hero-btn-main"
            >
              <Sparkles size={18} /> Book a Free Demo
            </button>
            <a href="#courses" className="btn btn-secondary btn-lg">
              Explore Courses <ArrowRight size={18} />
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="hero-trust-list">
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Zero-Risk Trial Class</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} className="trust-icon" />
              <span>100% Tutor Match Guarantee</span>
            </div>
            <div className="trust-item">
              <Zap size={16} className="trust-icon" />
              <span>Diagnostic Skill Audit</span>
            </div>
          </div>

          {/* Social Proof Strip */}
          <div className="hero-rating-strip">
            <div className="avatar-group">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Student" className="avatar-img" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Student" className="avatar-img" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80" alt="Student" className="avatar-img" />
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80" alt="Student" className="avatar-img" />
              <span className="avatar-count">+1.2k</span>
            </div>
            <div className="rating-details">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                ))}
                <span className="rating-score">4.96 / 5.0</span>
              </div>
              <p className="rating-caption">Trusted by 1,200+ expat & international families</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="hero-visual-col">
          <div className="hero-card-frame">
            {/* Main Mascot Card */}
            <div className="mascot-card-wrapper animate-float">
              <img 
                src="/images/mascot.jpg" 
                alt="Magπ Academic Mascot" 
                className="mascot-card-img"
              />
              <div className="card-overlay-gradient"></div>
              
              <div className="card-caption">
                <span className="caption-badge">Meet π-Mentor</span>
                <h3>Customized Learning Path for Every Child</h3>
              </div>
            </div>

            {/* Floating Metric Pill 1 */}
            <div className="floating-badge badge-grade">
              <div className="floating-badge-icon green">
                <TrendingUp size={20} />
              </div>
              <div>
                <strong>+2.4 Grades</strong>
                <span>Average Student Elevation</span>
              </div>
            </div>

            {/* Floating Metric Pill 2 */}
            <div className="floating-badge badge-tutor">
              <div className="floating-badge-icon coral">
                <Users size={20} />
              </div>
              <div>
                <strong>Top 1.8%</strong>
                <span>Global Tutor Acceptance</span>
              </div>
            </div>

            {/* Floating Live Indicator */}
            <div className="floating-live-pill">
              <span className="live-pulse-dot"></span>
              <Video size={14} />
              <span>42 Live Sessions in Progress</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
