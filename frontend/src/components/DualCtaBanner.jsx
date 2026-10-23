import React from 'react';
import { ArrowRight } from 'lucide-react';
import './DualCtaBanner.css';
import { useSiteMedia } from '../context/MediaContext';

export default function DualCtaBanner({ onOpenDemo }) {
  const { getMedia } = useSiteMedia();

  return (
    <section className="psittacus-dual-cta-section">
      <div className="container">
        <div className="dual-cta-grid">
          {/* Card 1: Explore Our Courses */}
          <div className="dual-cta-card">
            <div className="dual-cta-visual">
              <img 
                src={getMedia('cta_explore', '/assets/psittacus/cta-explore.png')} 
                alt="Explore Our Courses" 
                className="dual-cta-img" 
              />
            </div>
            <div className="dual-cta-content">
              <h3 className="dual-cta-title">Explore Our Courses</h3>
              <p className="dual-cta-desc">
                Dive into a wide range of expertly designed courses tailored to help you grow in your career.
              </p>
              <a href="#courses" className="btn-cta-explore">
                <span>Explore Now</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Card 2: Book A Free Demo */}
          <div className="dual-cta-card">
            <div className="dual-cta-visual">
              <img 
                src={getMedia('cta_enroll', '/assets/psittacus/cta-enroll.png')} 
                alt="Book A Free Demo" 
                className="dual-cta-img" 
              />
            </div>
            <div className="dual-cta-content">
              <h3 className="dual-cta-title">Book A Free Demo</h3>
              <p className="dual-cta-desc">
                Take the first step toward your learning journey by booking a free demo with us.
              </p>
              <button onClick={() => onOpenDemo()} className="btn-cta-book">
                <span>Book Now</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
