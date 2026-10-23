import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  CircleDollarSign, 
  BookOpen, 
  Clock, 
  Headphones,
  ArrowRight
} from 'lucide-react';
import './AchieveGoals.css';

const GOALS = [
  {
    id: 'tutors',
    title: 'Expert & Friendly Tutors',
    subtitle: 'Vetted international examiners & senior mentors',
    actionText: 'Meet Educators',
    icon: <GraduationCap size={28} />,
    bg: '#EFF6FF',
    iconBg: '#0077E6',
    shadowColor: '#BFDBFE',
    target: '/about-us#faculty'
  },
  {
    id: 'pricing',
    title: 'Affordable Pricing',
    subtitle: 'Transparent 1-on-1 value vs offline coaching',
    actionText: 'Compare Value',
    icon: <CircleDollarSign size={28} />,
    bg: '#F0FDF4',
    iconBg: '#10B981',
    shadowColor: '#BBF7D0',
    target: '#comparison'
  },
  {
    id: 'learning',
    title: 'Adaptive Learning',
    subtitle: 'Tailored to your child’s pace & global syllabus',
    actionText: 'Explore Curriculums',
    icon: <BookOpen size={28} />,
    bg: '#E0F2FE',
    iconBg: '#0284C7',
    shadowColor: '#BAE6FD',
    target: '/online-tuition'
  },
  {
    id: 'schedule',
    title: 'Flexible Schedule',
    subtitle: 'Morning, evening & weekend slots available',
    actionText: 'Book Free Demo',
    icon: <Clock size={28} />,
    bg: '#F5F3FF',
    iconBg: '#6366F1',
    shadowColor: '#DDD6FE',
    action: 'demo'
  },
  {
    id: 'support',
    title: 'Personalized Support',
    subtitle: '24/7 Academic concierge & WhatsApp advisor',
    actionText: 'Get in Touch',
    icon: <Headphones size={28} />,
    bg: '#F1F5F9',
    iconBg: '#0A2540',
    shadowColor: '#CBD5E1',
    target: '/contact-us'
  }
];

export default function AchieveGoals({ onOpenDemo }) {
  const navigate = useNavigate();

  const handleGoalClick = (goal) => {
    if (goal.action === 'demo' && typeof onOpenDemo === 'function') {
      onOpenDemo('Flexible 1-on-1 Schedule');
      return;
    }

    if (goal.target) {
      if (goal.target.startsWith('#')) {
        const el = document.querySelector(goal.target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/' + goal.target);
        }
      } else {
        navigate(goal.target);
      }
    }
  };

  return (
    <section className="achieve-goals-section" id="goals">
      <div className="container">
        <div className="psittacus-header">
          <h2 className="psittacus-title">Achieve Your Goals With Magπ</h2>
          <p className="psittacus-subtitle">
            We don't just teach — we guide, mentor, and prepare you for real success. Our expert tutors and industry-aligned courses ensure you gain not just knowledge, but mastery. Every course is designed to help you move one step closer to your personal, academic, or career goal.
          </p>
        </div>

        <div className="goals-cards-row">
          {GOALS.map((g) => (
            <div 
              key={g.id} 
              className="goal-block-card interactive-goal-card"
              onClick={() => handleGoalClick(g)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleGoalClick(g);
                }
              }}
              style={{ 
                backgroundColor: g.bg,
                boxShadow: `8px 8px 0px ${g.shadowColor}`
              }}
              title={`Click to explore: ${g.title}`}
            >
              <div 
                className="goal-icon-circle"
                style={{ backgroundColor: g.iconBg }}
              >
                {g.icon}
              </div>
              <h3 className="goal-card-name">{g.title}</h3>
              <p className="goal-card-desc">{g.subtitle}</p>
              <div className="goal-card-cta" style={{ color: g.iconBg }}>
                <span>{g.actionText}</span>
                <ArrowRight size={13} className="goal-cta-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
