import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import api from '../services/api.js';

const DEFAULT_REVIEWS = [
  {
    quote: 'My child developed real, useful skills in a fun and interactive way. Always something new to learn here!',
    author: 'Ayaz Ahmed Khan',
    role: 'Parent of Ibrahim Khan'
  },
  {
    quote: 'The structure helped my child think quickly and organize ideas clearly. The sessions built confidence under pressure.',
    author: 'Nishat Anjum',
    role: 'Parent of Sarah Javed'
  },
  {
    quote: 'Thank you for creating such engaging learning opportunities! The sessions made complex topics easy and enjoyable to understand.',
    author: 'Thomas',
    role: 'Parent of Davian & Cristabel Thomas'
  }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);

  useEffect(() => {
    let isMounted = true;
    api.getTestimonials({ activeOnly: true })
      .then(res => {
        if (isMounted && res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setReviews(res.data);
        }
      })
      .catch(err => {
        console.warn('[Testimonials] Could not load dynamic testimonials, using defaults:', err.message);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="psittacus-testimonials-section" id="testimonials">
      {/* Top Angled Dark Accent Strip */}
      <div className="angled-divider-top"></div>

      <div className="container">
        <div className="psittacus-header">
          <h2 className="psittacus-title">What Parents & Students Say About Magπ</h2>
        </div>

        <div className="testimonials-cards-row">
          {reviews.map((rev, index) => (
            <div key={rev._id || index} className="psittacus-review-card">
              <p className="review-text">"{rev.quote}"</p>
              <div className="review-author-box">
                <h3 className="review-author-name">{rev.author}</h3>
                <span className="review-author-role">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

