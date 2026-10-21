import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe2, 
  Sparkles, 
  Headphones, 
  MessageCircle, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  Compass
} from 'lucide-react';
import './PagesCommon.css';
import './SkillPages.css';

export default function LanguagesPage({ onOpenDemo }) {
  const languages = [
    {
      name: "French Language Fluency & Exam Prep",
      flag: "🇫🇷",
      levels: "CEFR A1, A2, B1, B2 | DELF Prim & Junior",
      summary: "Master conversational French with native Parisian educators. Complete preparation for DELF examinations and IGCSE / IB French B.",
      topics: [
        "Natural phonetic pronunciation & French liaison rules",
        "Impromptu conversational dialogues & cultural idioms",
        "Grammar mastery: Passé Composé, Imparfait & Subjunctive",
        "DELF listening comprehension and oral interview simulations"
      ],
      tutors: "Native French certified educators"
    },
    {
      name: "Spanish Language & Cultural Immersion",
      flag: "🇪🇸",
      levels: "CEFR A1 to B2 | DELE Escolar & SIELE",
      summary: "Speak fluent Spanish from lesson one. Tailored for school curriculums (IB Spanish Ab Initio/B, IGCSE) and real-world travel fluency.",
      topics: [
        "Accent coaching & fluid sentence construction",
        "DELE exam format drills: listening, reading & speaking",
        "Everyday colloquial expressions and Latin American variations",
        "Interactive storytelling, roleplaying and debate in Spanish"
      ],
      tutors: "Native Spanish speaking faculty"
    },
    {
      name: "German Language Foundations & Goethe Prep",
      flag: "🇩🇪",
      levels: "Goethe-Zertifikat A1, A2 & B1",
      summary: "Demystify German grammar, noun genders, and compound structures with intuitive, step-by-step logic and native conversation.",
      topics: [
        "Pronunciation rules and clear German phonetics",
        "Mastery of the 4 cases (Nominativ, Akkusativ, Dativ, Genitiv)",
        "Goethe-Zertifikat exam tasks and timed audio drills",
        "Preparation for study and careers in Germany and Switzerland"
      ],
      tutors: "Goethe-certified native German educators"
    },
    {
      name: "Mandarin Chinese (Putonghua) for Young Scholars",
      flag: "🇨🇳",
      levels: "YCT (Youth Chinese Test) & HSK Levels 1 - 4",
      summary: "Learn the world's most spoken native language with an intuitive tone-mastery framework and pinyin-to-character progression.",
      topics: [
        "Mastering the 4 tones with musical inflection memory tricks",
        "Pinyin reading, stroke order rules & radical recognition",
        "Conversational daily life scenarios and school greetings",
        "Official YCT & HSK examination practice mock tests"
      ],
      tutors: "Native Mandarin accredited instructors"
    }
  ];

  return (
    <div className="skill-page languages-page">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Skill Courses</span>
            <span>/</span>
            <span className="active">Global Languages</span>
          </div>
          <div className="page-hero-badge">
            <Globe2 size={14} /> World Languages Academy
          </div>
          <h1 className="page-hero-title">
            Conversational Fluency in <span className="text-highlight">French, Spanish & German</span>
          </h1>
          <p className="page-hero-desc">
            Transform second language learning from tedious memorization into genuine conversational confidence. 1-on-1 immersion sessions led by native speakers, aligned with international CEFR certification boards.
          </p>
          <div className="page-hero-actions">
            <button onClick={() => onOpenDemo('Global Languages')} className="btn btn-primary">
              <Sparkles size={16} /> Book Free Language Trial Class
            </button>
            <a href="#languages-list" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              Explore Languages <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Feature Strip */}
      <div className="page-feature-strip">
        <div className="container">
          <div className="feature-strip-grid">
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Headphones size={22} /></div>
              <div>
                <strong>100% Native Speaker Educators</strong>
                <span>Learn authentic natural accents and cultural nuances</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><Award size={22} /></div>
              <div>
                <strong>Official CEFR Certifications</strong>
                <span>DELF, DELE, Goethe & HSK examination alignment</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><MessageCircle size={22} /></div>
              <div>
                <strong>80% Conversational Immersion</strong>
                <span>Active speaking practice in every single session</span>
              </div>
            </div>
            <div className="feature-strip-item">
              <div className="feature-strip-icon"><BookOpen size={22} /></div>
              <div>
                <strong>School Curriculum Support</strong>
                <span>Top grades in IGCSE & IB Language B examinations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Languages List */}
      <section id="languages-list" className="page-section">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Languages Offered</div>
            <h2>Unlock Multilingual Fluency with Native Tutors</h2>
            <p>
              Choose from our world-class language pathways, tailored for students from beginner levels to advanced diploma preparation.
            </p>
          </div>

          <div className="languages-cards-grid">
            {languages.map((lang, idx) => (
              <div key={idx} className="language-card">
                <div className="lang-header">
                  <span className="lang-flag">{lang.flag}</span>
                  <div>
                    <h3 className="lang-title">{lang.name}</h3>
                    <span className="lang-levels">{lang.levels}</span>
                  </div>
                </div>

                <p className="lang-summary">{lang.summary}</p>

                <div className="lang-topics">
                  <h4>Core Focus Areas:</h4>
                  <ul>
                    {lang.topics.map((t, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="track-check" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lang-tutor-badge">
                  <Users size={15} />
                  <span>{lang.tutors}</span>
                </div>

                <button 
                  onClick={() => onOpenDemo(lang.name)} 
                  className="btn btn-outline btn-block"
                >
                  <Sparkles size={16} /> Book Trial for {lang.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Immersion Method */}
      <section className="page-section alt-bg">
        <div className="container">
          <div className="page-section-header">
            <div className="badge-tag brand">Our Methodology</div>
            <h2>The Psittacus Natural Immersion Method</h2>
            <p>
              Why traditional school rote-learning fails, and why our 1-on-1 native conversational approach accelerates fluency by 3x.
            </p>
          </div>

          <div className="immersion-steps-grid">
            <div className="immersion-step-card">
              <div className="immersion-num">1</div>
              <h4>Auditory Pacing & Accent Mirroring</h4>
              <p>Students absorb native acoustic rhythms through structured dialogue roleplays before writing complex grammar.</p>
            </div>
            <div className="immersion-step-card">
              <div className="immersion-num">2</div>
              <h4>Contextual Vocabulary Architecture</h4>
              <p>Words are learned inside meaningful thematic situations (ordering in cafes, travel debates) rather than isolated vocabulary lists.</p>
            </div>
            <div className="immersion-step-card">
              <div className="immersion-num">3</div>
              <h4>Grammar as an Intuitive Blueprint</h4>
              <p>Grammar rules are unraveled intuitively through pattern recognition, eliminating fear and hesitation during speaking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="page-cta-banner">
        <div className="container cta-content-wrapper">
          <h2>Hear Your Child Speak a New Language with Confidence</h2>
          <p>
            Experience a 45-minute 1-on-1 trial session with a native-speaking tutor. Complimentary diagnostic assessment included.
          </p>
          <div className="cta-actions">
            <button onClick={() => onOpenDemo('Global Languages')} className="btn btn-primary btn-lg">
              <Sparkles size={18} /> Book Free Language Trial Class
            </button>
            <Link to="/contact-us" className="btn btn-secondary btn-lg">
              Contact Language Counselors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
