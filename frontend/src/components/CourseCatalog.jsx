import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CourseCatalog.css';
import { useSiteMedia } from '../context/MediaContext';

const COURSES = [
  {
    id: 'academics',
    mediaKey: 'course_academic',
    title: 'Academic Subjects',
    image: '/assets/psittacus/course-academic.jpg',
    link: '/online-tuition'
  },
  {
    id: 'reasoning',
    mediaKey: 'course_reasoning',
    title: 'Reasoning & Aptitude',
    image: '/assets/psittacus/course-reasoning.jpg',
    link: '/reasoning-and-aptitude'
  },
  {
    id: 'coding',
    mediaKey: 'course_coding',
    title: 'Coding & Programming',
    image: '/assets/psittacus/course-coding.jpg',
    link: '/coding-and-programming'
  },
  {
    id: 'communication',
    mediaKey: 'course_communication',
    title: 'Communication Skills',
    image: '/assets/psittacus/course-communication.jpg',
    link: '/communication'
  },
  {
    id: 'languages',
    mediaKey: 'course_languages',
    title: 'Global Languages',
    image: '/assets/psittacus/course-languages.jpg',
    link: '/language-classes'
  }
];

export default function CourseCatalog() {
  const { getMedia } = useSiteMedia();

  return (
    <section className="explore-courses-section" id="courses">
      <div className="container">
        <div className="psittacus-header">
          <h2 className="psittacus-title">Explore Our Courses</h2>
          <p className="psittacus-subtitle">
            Choose from a wide range of career-focused, industry-aligned courses taught by certified professionals. Learn online anytime, anywhere.
          </p>
        </div>

        <div className="psittacus-courses-grid">
          {COURSES.map((course) => (
            <div key={course.id} className="psittacus-course-card">
              <div className="course-card-image-wrap">
                <img 
                  src={getMedia(course.mediaKey, course.image)} 
                  alt={course.title} 
                  className="course-card-img" 
                />
              </div>
              <h3 className="course-card-title">{course.title}</h3>
              <Link to={course.link} className="btn-course-check">
                <span>Check Details</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
