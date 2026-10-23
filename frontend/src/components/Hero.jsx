import React, { useState, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';
import './Hero.css';
import { useSiteMedia } from '../context/MediaContext';

export default function Hero({ onOpenDemo }) {
  const { getMedia } = useSiteMedia();
  const boards = ['IB', 'IGCSE', 'SABIS', 'A & AS Level'];
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBoardIndex((prev) => (prev + 1) % boards.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [boards.length]);

  return (
    <section className="psittacus-hero" id="home">
      <div className="container hero-inner">
        {/* Left Side: Copy & CTA */}
        <div className="hero-text-col">
          <h1 className="hero-heading">
            Personalized Online <br />
            Tuitions for <br />
            <span className="hero-board-rotator">{boards[currentBoardIndex]}</span>
          </h1>

          <p className="hero-description">
            One-on-one and group classes across global boards like IGCSE, IB, A & AS Level, and SABIS—personalized to your child’s pace and passion.
          </p>

          <div className="hero-actions">
            <button 
              onClick={() => onOpenDemo()} 
              className="btn btn-hero-demo"
            >
              <ThumbsUp size={18} className="thumb-icon" />
              <span>Book a Free Demo</span>
            </button>
          </div>
        </div>

        {/* Right Side: Exact Psittacus Hero Image */}
        <div className="hero-image-col">
          <div className="hero-image-wrapper">
            <img 
              src={getMedia('home_hero', '/assets/psittacus/hero-students.jpg')} 
              alt="Personalized Online Tuitions for IB IGCSE SABIS" 
              className="hero-students-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
