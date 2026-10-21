import React, { useState } from 'react';
import { 
  Award, 
  Star, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Globe2,
  Quote
} from 'lucide-react';
import './FacultyShowcase.css';

const FACULTY_MEMBERS = [
  {
    id: 'fac_1',
    name: 'Dr. Jonathan Vance',
    category: 'stem',
    role: 'Cambridge IGCSE & A-Level Lead Examiner',
    degree: 'PhD in Applied Mathematics, Cambridge University',
    rating: 4.99,
    reviews: 148,
    hours: '1,850+ hrs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    tags: ['Cambridge IGCSE', 'A-Level Math', 'Further Math', 'Physics'],
    reviewSnippet: 'Helped my daughter jump from a C to an A* in Cambridge IGCSE Extended Math in under 4 months.',
    parent: 'Mrs. Al-Mansoor (Dubai, UAE)'
  },
  {
    id: 'fac_2',
    name: 'Elena Rostova',
    category: 'ib',
    role: 'Senior IB Diploma (DP) Examiner',
    degree: 'MSc Imperial College London • 45/45 IB Alum',
    rating: 4.98,
    reviews: 124,
    hours: '1,420+ hrs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    tags: ['IB DP Physics HL/SL', 'IB Math AA', 'Internal Assessment (IA)'],
    reviewSnippet: 'Elena knows the IB mark scheme inside out. Her guidance on the Physics IA was worth gold.',
    parent: 'Marcus Thorne (Singapore)'
  },
  {
    id: 'fac_3',
    name: 'Priya Sharma',
    category: 'coding',
    role: 'AI & Computational Thinking Lead',
    degree: 'BTech Computer Science • Stanford AI Fellow',
    rating: 4.97,
    reviews: 96,
    hours: '1,100+ hrs',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    tags: ['Python for Kids', 'AI & Machine Learning', 'USACO Coding'],
    reviewSnippet: 'My 12-year old went from Scratch to building a functional Python game with Priya. Exceptional mentor.',
    parent: 'Sarah J. (London, UK)'
  },
  {
    id: 'fac_4',
    name: 'Marcus Chen',
    category: 'stem',
    role: 'AP Calculus & SAT Master Mentor',
    degree: 'BSc Princeton University • 800/800 SAT Math',
    rating: 4.98,
    reviews: 112,
    hours: '1,350+ hrs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    tags: ['AP Calculus BC', 'SAT Math 800', 'College Algebra'],
    reviewSnippet: 'Scored a 5 on AP Calculus BC thanks to Marcus. He makes high-level calculus completely intuitive.',
    parent: 'David K. (San Jose, USA)'
  },
  {
    id: 'fac_5',
    name: 'Madame Sophie Laurent',
    category: 'languages',
    role: 'Native DELF/DALF French Examiner',
    degree: 'Sorbonne Université, Paris • Native French & Spanish',
    rating: 4.99,
    reviews: 88,
    hours: '1,200+ hrs',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    tags: ['DELF / DALF A1-B2', 'IGCSE French', 'Conversational Spanish'],
    reviewSnippet: 'Sophie took away my fear of oral French exams. I received full marks on my IGCSE speaking test!',
    parent: 'Tara N. (Doha, Qatar)'
  },
  {
    id: 'fac_6',
    name: 'Dr. Tariq Al-Sayed',
    category: 'ib',
    role: 'IB Chemistry & Biology Specialist',
    degree: 'MD & Postgrad Oxford University',
    rating: 4.98,
    reviews: 104,
    hours: '1,600+ hrs',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    tags: ['IB Chemistry HL', 'AP Biology', 'Medical School Prep'],
    reviewSnippet: 'Tariq bridges theoretical chemistry with clinical applications. Brilliant teacher.',
    parent: 'Kareem H. (Riyadh, KSA)'
  }
];

export default function FacultyShowcase({ onOpenDemo }) {
  const [filter, setFilter] = useState('all');

  const filteredFaculty = filter === 'all' 
    ? FACULTY_MEMBERS 
    : FACULTY_MEMBERS.filter(f => f.category === filter);

  const handleBookWithMentor = (mentor) => {
    if (onOpenDemo) {
      onOpenDemo(`${mentor.tags[0]} with ${mentor.name}`);
    }
  };

  return (
    <section className="section faculty-showcase-section" id="faculty">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <div className="badge-tag coral">
            <Award size={14} /> Top 1% Global Educators
          </div>
          <h2 className="section-title">
            Learn from <span className="highlight-text">Accredited Board Examiners</span> & Masters
          </h2>
          <p className="section-subtitle">
            We reject 97% of tutor applicants. Every Magπ educator is an accomplished subject specialist, 
            official board examiner, or graduate of premier institutions like Cambridge, Oxford, and Princeton.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="faculty-filter-bar">
          {[
            { id: 'all', label: 'All Faculty' },
            { id: 'stem', label: 'STEM & Mathematics' },
            { id: 'ib', label: 'IB DP & IGCSE Specialists' },
            { id: 'coding', label: 'Coding & AI Labs' },
            { id: 'languages', label: 'Global Languages' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`faculty-tab ${filter === tab.id ? 'active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Faculty Grid */}
        <div className="faculty-grid">
          {filteredFaculty.map((member) => (
            <div key={member.id} className="faculty-card">
              <div className="faculty-card-header">
                <div className="avatar-wrapper">
                  <img src={member.avatar} alt={member.name} className="faculty-img" />
                  <span className="verified-badge" title="Verified Board Examiner">
                    <CheckCircle2 size={14} />
                  </span>
                </div>
                <div className="faculty-intro">
                  <h3 className="faculty-name">{member.name}</h3>
                  <span className="faculty-role">{member.role}</span>
                  <div className="faculty-degree">
                    <GraduationCap size={13} />
                    <span>{member.degree}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="faculty-tags">
                {member.tags.map((tag) => (
                  <span key={tag} className="f-tag">{tag}</span>
                ))}
              </div>

              {/* Testimonial Quote */}
              <div className="faculty-review-box">
                <Quote size={16} className="quote-icon" />
                <p>"{member.reviewSnippet}"</p>
                <small>— {member.parent}</small>
              </div>

              {/* Stats Bar & CTA */}
              <div className="faculty-card-bottom">
                <div className="faculty-stats">
                  <div className="f-stat">
                    <Star size={13} className="star-icon" />
                    <strong>{member.rating}</strong>
                    <span>({member.reviews})</span>
                  </div>
                  <div className="f-stat">
                    <Clock size={13} className="clock-icon" />
                    <strong>{member.hours}</strong>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn btn-primary btn-book-faculty"
                  onClick={() => handleBookWithMentor(member)}
                >
                  <span>Book Free Demo</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
