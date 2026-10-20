import React from 'react';
import { BOARDS_COVERED } from '../data/coursesData';
import { 
  BookOpen, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Star, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import './CurriculumsSection.css';

const ICON_MAP = {
  BookOpen: <BookOpen size={24} />,
  Award: <Award size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  CheckCircle2: <CheckCircle2 size={24} />,
  Star: <Star size={24} />,
  Globe: <Globe size={24} />,
  TrendingUp: <TrendingUp size={24} />
};

export default function CurriculumsSection({ onOpenDemo }) {
  return (
    <section className="section curriculums-section" id="curriculums">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag blue">
            <Globe size={14} /> Global Standards
          </div>
          <h2 className="section-title">
            International Curriculums We Specialize In
          </h2>
          <p className="section-subtitle">
            Our certified examiners and faculty are rigorously trained in syllabus blueprints, 
            past paper rubrics, and marking criteria for all premier global boards.
          </p>
        </div>

        <div className="boards-grid">
          {BOARDS_COVERED.map((board, index) => (
            <div key={index} className="board-card">
              <div className="board-top">
                <div className="board-icon-box">
                  {ICON_MAP[board.icon] || <BookOpen size={24} />}
                </div>
                <span className="board-grade-badge">{board.badge}</span>
              </div>
              <h3 className="board-card-name">{board.name}</h3>
              <p className="board-card-code">{board.code}</p>
              <button 
                onClick={() => onOpenDemo(board.name)} 
                className="board-learn-more"
              >
                <span>Book Trial for This Board</span> <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
