import React from 'react';
import { ACHIEVE_GOALS } from '../data/coursesData';
import { 
  GraduationCap, 
  BadgePercent, 
  Sparkles, 
  Calendar, 
  Headphones,
  CheckCircle2
} from 'lucide-react';
import './AchieveGoals.css';

const ICON_MAP = {
  GraduationCap: <GraduationCap size={28} className="goal-icon coral" />,
  BadgePercent: <BadgePercent size={28} className="goal-icon gold" />,
  Sparkles: <Sparkles size={28} className="goal-icon blue" />,
  Calendar: <Calendar size={28} className="goal-icon green" />,
  Headphones: <Headphones size={28} className="goal-icon purple" />
};

export default function AchieveGoals() {
  return (
    <section className="achieve-goals-section">
      <div className="container">
        <div className="achieve-goals-header">
          <div className="badge-tag coral">
            <CheckCircle2 size={14} /> Proven Excellence
          </div>
          <h2 className="achieve-title">Achieve Your Goals with Magπ</h2>
          <p className="achieve-subtitle">
            Everything your child needs to turn complex academic syllabuses into genuine confidence and top exam grades.
          </p>
        </div>

        <div className="achieve-grid">
          {ACHIEVE_GOALS.map((goal) => (
            <div key={goal.id} className="achieve-card">
              <div className="achieve-icon-wrapper">
                {ICON_MAP[goal.icon] || <Sparkles size={28} />}
              </div>
              <h3 className="achieve-card-title">{goal.title}</h3>
              <p className="achieve-card-desc">{goal.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
