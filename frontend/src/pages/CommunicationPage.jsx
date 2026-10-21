import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Sparkles, 
  Mic, 
  Award, 
  BookOpen, 
  Users, 
  Globe2, 
  CheckCircle2, 
  Video, 
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import './PagesCommon.css';
import './SkillPages.css';

export default function CommunicationPage({ onOpenDemo }) {
  const tracks = [
    {
      title: "Public Speaking & Impromptu Oratory",
      ageGroup: "Ages 8 - 18 (Grouped by Age & Confidence Level)",
      summary: "Transform stage fright into commanding poise. Master vocal modulation, non-verbal cues, and impromptu speaking frameworks.",
      modules: [
        "Overcoming performance anxiety & posture coaching",
        "P.R.E.P. Framework (Point, Reason, Example, Point) for impromptu speeches",
        "Voice projection, pacing, pauses, and tone modulation",
        "Storytelling structures that captivate diverse audiences"
      ],
      outcome: "Confident school assembly speeches & college interview poise"
    },
    {
      title: "Model United Nations (MUN) Diplomacy",
      ageGroup: "Ages 11 - 18",
      summary: "Master geopolitical research, position paper drafting, lobbying, and consensus building in international simulations.",
      modules: [
        "United Nations rules of procedure & diplomatic decorum",
        "Drafting high-scoring Position Papers & Draft Resolutions",
        "Moderated & unmoderated caucus strategy",
        "Point of Information (POI) defense & alliance crafting"
      ],
      outcome: "Win Best Delegate & Honorable Mention gavels globally"
    },
    {
      title: "Competitive Parliamentary Debate",
      ageGroup: "Ages 12 - 18",
      summary: "Construct airtight arguments, anticipate opponent objections, and deliver crushing cross-examination rebuttals.",
      modules: [
        "World Schools Debating Championship (WSDC) format",
        "Logical fallacy deconstruction & premise testing",
        "Motion preparation in 15-minute prep times",
        "Whip speech summarization & judge adjudication focus"
      ],
      outcome: "Represent your school in national and international tournaments"
    },
    {
      title: "Creative Writing & Advanced Vocabulary",
      ageGroup: "Ages 8 - 16",
      summary: "Ignite literary imagination and cultivate articulate writers capable of crafting sophisticated prose with vivid sensory depth.",
      modules: [
        "Narrative arc, tension building & character voice development",
        "Show-Don't-Tell sensory descriptive techniques",
        "500+ high-frequency academic vocabulary words in context",
        "Poetic meter, rhetorical metaphors & persuasive essays"
      ],
      outcome: "Publish stories in Psittacus’s annual Global Student Anthology"
    }
  ];

  return (
    <div className="skill-page communication-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Skill Courses</span>
            <span>/</span>
            <span className="active">Communication Skills</span>
          </div>
          <div className="page-hero-badge">
            <MessageSquare size={14} /> Leadership & Expression Lab
          </div>
          <h1 className="page-hero-title">
            Master Public Speaking, <span className="text-highlight">Debate & MUN Diplomacy</span>
          </h1>
          <p className="page-hero-desc">
            Empower your child to speak with conviction, structure complex arguments with clarity, and lead international forums with commanding presence. Taught by certified debate coaches and Harvard MUN alumni.
          </p>
          <div className="page-hero-actions">
            <button onClick={() => onOpenDemo('Public Speaking & Debate')} className="btn btn-primary">
              <Sparkles size={16} /> Book Free Speech Evaluation
            </button>
            <a href="#tracks" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              View Curriculum Tracks <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Feature Strip */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Mic size={22} /></div>
              <div>
                <strong>Video Recorded Delivery Feedback</strong>
                <span>Every speech recorded & analyzed frame-by-frame</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Award size={22} /></div>
              <div>
                <strong>Global Tournament Prep</strong>
                <span>Direct mentorship for MUN, WSDC & school debates</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Users size={22} /></div>
              <div>
                <strong>1-on-1 & Micro Debate Pods</strong>
                <span>Practice live speeches with peer audiences</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><FileCheck size={22} /></div>
              <div>
                <strong>Anthology Publishing</strong>
                <span>Top student stories published and printed annually</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Program Tracks */}
      <section id="tracks" className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Curriculum Tracks</div>
            <h2>Specialized Communication Programs</h2>
            <p>
              Whether starting from stage fright or sharpening advanced debate rhetoric for global championships.
            </p>
          </div>

          <div className="skill-tracks-grid">
            {tracks.map((track, idx) => (
              <div key={idx} className="track-card">
                <div className="track-age-pill">{track.ageGroup}</div>
                <h3 className="track-title">{track.title}</h3>
                <p className="track-summary">{track.summary}</p>

                <div className="track-modules">
                  <h4>What Your Child Will Master:</h4>
                  <ul>
                    {track.modules.map((m, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="track-check" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="track-outcome-box">
                  <strong>Target Milestone:</strong> {track.outcome}
                </div>

                <button 
                  onClick={() => onOpenDemo(track.title)} 
                  className="btn btn-outline btn-block"
                >
                  <Sparkles size={16} /> Book Trial for this Track
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The 3-Pillar Speech Methodology */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Our Framework</div>
            <h2>The Psittacus Oratory Blueprint</h2>
            <p>
              How our students consistently emerge as articulate leaders in their schools and communities.
            </p>
          </div>

          <div className="oratory-pillars-grid">
            <div className="oratory-card">
              <div className="pillar-num">01</div>
              <h4>Content Scaffolding</h4>
              <p>Structure ideas using rhetorical blueprints so students never run out of points, even during surprise impromptu topics.</p>
            </div>
            <div className="oratory-card">
              <div className="pillar-num">02</div>
              <h4>Vocal & Physical Delivery</h4>
              <p>Master diaphragmatic breathing, commanding eye contact, purposeful gestures, and inflection that commands listener respect.</p>
            </div>
            <div className="oratory-card">
              <div className="pillar-num">03</div>
              <h4>Psychological Poise</h4>
              <p>Transform nervous energy into charismatic enthusiasm, equipping students for life-defining interviews and podium addresses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="page-cta-banner">
        <div className="container cta-content-wrapper">
          <h2>Hear Your Child Speak with Unstoppable Poise</h2>
          <p>
            Schedule a 45-minute 1-on-1 speech diagnostic. Our senior coach will evaluate vocal pacing, tone, and confidence.
          </p>
          <div className="cta-actions">
            <button onClick={() => onOpenDemo('Public Speaking & Debate')} className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Book Free Speech Diagnostic
            </button>
            <Link to="/contact-us" className="btn btn-secondary btn-lg">
              Speak to a Speech Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
