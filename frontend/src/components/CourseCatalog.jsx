import React, { useState } from 'react';
import { 
  CURRICULA, 
  COURSES 
} from '../data/coursesData';
import { 
  BookOpen, 
  Check, 
  Star, 
  Sparkles, 
  Users, 
  GraduationCap, 
  ArrowUpRight,
  Info
} from 'lucide-react';
import './CourseCatalog.css';

export default function CourseCatalog({ onSelectCourseForDemo }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  const filteredCourses = activeCategory === 'all' 
    ? COURSES 
    : COURSES.filter(course => course.category === activeCategory);

  return (
    <section className="section courses-section" id="courses">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag coral">
            <GraduationCap size={14} /> Comprehensive Curriculums & Skills
          </div>
          <h2 className="section-title">
            Tailored Courses Designed for Academic Mastery
          </h2>
          <p className="section-subtitle">
            Whether preparing for high-stakes board examinations or exploring tomorrow's technology, 
            every program is taught 1-on-1 by certified subject-matter specialists.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="courses-filter-tabs">
          {CURRICULA.map(curriculum => (
            <button
              key={curriculum.id}
              onClick={() => setActiveCategory(curriculum.id)}
              className={`filter-tab-btn ${activeCategory === curriculum.id ? 'active' : ''}`}
            >
              {curriculum.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              {/* Card Media Header */}
              <div className="course-card-image-box">
                <img src={course.image} alt={course.title} className="course-img" />
                <span className={`course-badge ${course.badgeColor}`}>
                  {course.badge}
                </span>
                <div className="course-rating-pill">
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  <span>{course.rating}</span>
                  <small>({course.reviewsCount})</small>
                </div>
              </div>

              {/* Card Body */}
              <div className="course-card-body">
                <div className="course-grade-tag">
                  <Users size={13} /> {course.targetGrades}
                </div>

                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>

                {/* Subject Tags */}
                <div className="subject-tags-list">
                  {course.subjects.slice(0, 4).map((subj, i) => (
                    <span key={i} className="subject-pill">{subj}</span>
                  ))}
                  {course.subjects.length > 4 && (
                    <span className="subject-pill more">+{course.subjects.length - 4} more</span>
                  )}
                </div>

                {/* Key Bullet Features */}
                <div className="course-features">
                  {course.features.map((feat, i) => (
                    <div key={i} className="feature-row">
                      <div className="feature-check">
                        <Check size={12} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="course-card-footer">
                  <button 
                    onClick={() => setSelectedCourseDetails(course)}
                    className="btn btn-secondary btn-card"
                  >
                    <Info size={15} /> Syllabus Details
                  </button>
                  <button 
                    onClick={() => onSelectCourseForDemo(course.title)}
                    className="btn btn-primary btn-card"
                  >
                    <Sparkles size={15} /> Book a Free Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus Quick Details Modal */}
      {selectedCourseDetails && (
        <div className="details-modal-backdrop" onClick={() => setSelectedCourseDetails(null)}>
          <div className="details-modal-box" onClick={e => e.stopPropagation()}>
            <div className="details-modal-header">
              <div>
                <span className={`badge-tag ${selectedCourseDetails.badgeColor}`}>
                  {selectedCourseDetails.badge}
                </span>
                <h3>{selectedCourseDetails.title}</h3>
                <p className="modal-grade-target">{selectedCourseDetails.targetGrades} • {selectedCourseDetails.format}</p>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedCourseDetails(null)}
              >
                ✕
              </button>
            </div>

            <div className="details-modal-body">
              <div className="modal-section-block">
                <h4>Exam Boards & Accreditation</h4>
                <div className="tags-flex">
                  {selectedCourseDetails.examBoards.map((board, i) => (
                    <span key={i} className="board-badge">{board}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section-block">
                <h4>Covered Subjects & Modules</h4>
                <div className="tags-flex">
                  {selectedCourseDetails.subjects.map((subj, i) => (
                    <span key={i} className="subject-pill">{subj}</span>
                  ))}
                </div>
              </div>

              <div className="modal-section-block">
                <h4>Learning Outcomes & Pedagogy</h4>
                <ul className="modal-outcomes-list">
                  {selectedCourseDetails.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                  <li>Fortnightly parent reporting with full diagnostic skill breakdown</li>
                  <li>Access to Magπ digital resource bank, past question archives & marking keys</li>
                </ul>
              </div>
            </div>

            <div className="details-modal-footer">
              <button 
                onClick={() => setSelectedCourseDetails(null)} 
                className="btn btn-secondary"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  const courseTitle = selectedCourseDetails.title;
                  setSelectedCourseDetails(null);
                  onSelectCourseForDemo(courseTitle);
                }} 
                className="btn btn-primary"
              >
                <Sparkles size={16} /> Schedule 1-on-1 Trial for This Program
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
