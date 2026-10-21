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
    bg: '#EFF6FF',
    iconBg: '#0077E6',
    shadowColor: '#BFDBFE'
  },
  {
    id: 'pricing',
    title: 'Affordable Pricing',
    icon: <CircleDollarSign size={28} />,
    bg: '#F0FDF4',
    iconBg: '#10B981',
    shadowColor: '#BBF7D0'
  },
  {
    id: 'learning',
    title: 'Adaptive Learning',
    icon: <BookOpen size={28} />,
    bg: '#E0F2FE',
    iconBg: '#0284C7',
    shadowColor: '#BAE6FD'
  },
  {
    id: 'schedule',
    title: 'Flexible Schedule',
    icon: <Clock size={28} />,
    bg: '#F5F3FF',
    iconBg: '#6366F1',
    shadowColor: '#DDD6FE'
  },
  {
    id: 'support',
    title: 'Personalized Support',
    icon: <Headphones size={28} />,
    bg: '#F1F5F9',
    iconBg: '#0A2540',
    shadowColor: '#CBD5E1'
  }
];

export default function AchieveGoals() {
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
