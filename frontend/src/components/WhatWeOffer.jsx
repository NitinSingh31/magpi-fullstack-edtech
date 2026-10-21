import React from 'react';
import { 
  Users, 
  ClipboardCheck, 
  Clock, 
  Lightbulb, 
  BadgeDollarSign, 
  BookMarked 
} from 'lucide-react';
import './WhatWeOffer.css';

const OFFERS = [
  {
    icon: <Users size={32} />,
    title: 'Live 1-on-1 and Group Sessions with Expert Tutors'
  },
  {
    icon: <ClipboardCheck size={32} />,
    title: 'Individual Attention and Regular Assessments'
  },
  {
    icon: <Clock size={32} />,
    title: 'Flexible, Self-Paced Learning Anytime, Anywhere'
  },
  {
    icon: <Lightbulb size={32} />,
    title: 'STEAM Learning: Science, Tech, Engineering, Art, Math Combined'
  },
  {
    icon: <BadgeDollarSign size={32} />,
    title: 'Affordable Pricing for Premium Quality Tutoring'
  },
  {
    icon: <BookMarked size={32} />,
    title: 'Curriculum Support: IGCSE, IB, SABIS, AS & A Levels'
  }
];

export default function WhatWeOffer() {
  return (
    <section className="what-we-offer-section" id="offerings">
      <div className="container">
        <div className="psittacus-header">
          <h2 className="psittacus-title">What We Offer?</h2>
          <p className="psittacus-subtitle">
            At Psittacus, our values aren't just words — they are the principles that shape every course we create, every learner we support, and every goal we strive to achieve. These core values define our culture, drive our mission, and ensure we stay committed to delivering meaningful learning experiences.
          </p>
        </div>

        <div className="offers-grid">
          {OFFERS.map((item, idx) => (
            <div key={idx} className="offer-card">
              <div className="offer-icon-circle">
                {item.icon}
              </div>
              <h3 className="offer-card-title">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
