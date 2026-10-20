import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/coursesData';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, Award } from 'lucide-react';
import './Testimonials.css';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="badge-tag green">
            <Heart size={14} /> Proven Success Stories
          </div>
          <h2 className="section-title">
            Trusted by Parents & Students Worldwide
          </h2>
          <p className="section-subtitle">
            Read real stories from families who elevated their grades and developed a true passion 
            for learning with Magπ.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="testimonial-carousel-box">
          <div className="testimonial-slider-card">
            {/* Quote Icon Background */}
            <div className="quote-mark-icon">
              <Quote size={80} />
            </div>

            <div className="testimonial-grid">
              {/* Left Profile Info */}
              <div className="testimonial-author-col">
                <div className="author-avatar-wrapper">
                  <img 
                    src={activeTestimonial.avatar} 
                    alt={activeTestimonial.parentName} 
                    className="author-avatar-img"
                  />
                  <span className="author-country-flag">{activeTestimonial.flag}</span>
                </div>

                <h4 className="author-name">{activeTestimonial.parentName}</h4>
                <p className="student-info">{activeTestimonial.studentName}</p>
                <span className="location-tag">{activeTestimonial.location}</span>

                <div className="board-badge-pill">
                  <Award size={12} /> {activeTestimonial.board}
                </div>
              </div>

              {/* Right Quote Content */}
              <div className="testimonial-content-col">
                <div className="stars-row">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#F59E0B" color="#F59E0B" />
                  ))}
                  <span className="rating-tag">5.0 Star Parent Review</span>
                </div>

                <blockquote className="testimonial-quote-text">
                  "{activeTestimonial.quote}"
                </blockquote>

                {/* Navigation Dots & Buttons */}
                <div className="carousel-controls">
                  <div className="dots-row">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`dot-indicator ${currentIndex === i ? 'active' : ''}`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="arrows-group">
                    <button 
                      onClick={prevSlide} 
                      className="carousel-arrow-btn"
                      aria-label="Previous Testimonial"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextSlide} 
                      className="carousel-arrow-btn"
                      aria-label="Next Testimonial"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
