import React from 'react';
import { 
  GraduationCap, 
  CircleDollarSign, 
  BookOpen, 
  Clock, 
  Headphones 
} from 'lucide-react';
import './AchieveGoals.css';

const GOALS = [
  {
    id: 'tutors',
    title: 'Expert & Friendly Tutors',
    icon: <GraduationCap size={28} />,
    bg: '#FFF2E2',
    iconBg: '#FCAB48',
    shadowColor: '#F5CE98'
  },
  {
    id: 'pricing',
    title: 'Affordable Pricing',
    icon: <CircleDollarSign size={28} />,
    bg: '#FDF1FF',
    iconBg: '#A880B0',
    shadowColor: '#D8BCE0'
  },
  {
    id: 'learning',
    title: 'Adaptive Learning',
    icon: <BookOpen size={28} />,
    bg: '#FFEAE2',
    iconBg: '#F48F68',
    shadowColor: '#F0B6A1'
  },
  {
    id: 'schedule',
    title: 'Flexible Schedule',
    icon: <Clock size={28} />,
    bg: '#E6FDED',
    iconBg: '#519C68',
    shadowColor: '#A4DEB4'
  },
  {
    id: 'support',
    title: 'Personalized Support',
    icon: <Headphones size={28} />,
    bg: '#EDEAFF',
    iconBg: '#5751E1',
    shadowColor: '#AEA9EF'
  }
];

export default function AchieveGoals() {
  return (
    <section className="achieve-goals-section" id="goals">
      <div className="container">
        <div className="psittacus-header">
          <h2 className="psittacus-title">Achieve Your Goals With Psittacus</h2>
          <p className="psittacus-subtitle">
            We don't just teach — we guide, mentor, and prepare you for real success. Our expert tutors and industry-aligned courses ensure you gain not just knowledge, but mastery. Every course is designed to help you move one step closer to your personal, academic, or career goal.
          </p>
        </div>

        <div className="goals-cards-row">
          {GOALS.map((g) => (
            <div 
              key={g.id} 
              className="goal-block-card"
              style={{ 
                backgroundColor: g.bg,
                boxShadow: `8px 8px 0px ${g.shadowColor}`
              }}
            >
              <div 
                className="goal-icon-circle"
                style={{ backgroundColor: g.iconBg }}
              >
                {g.icon}
              </div>
              <h3 className="goal-card-name">{g.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
