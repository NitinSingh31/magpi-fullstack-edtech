import React from 'react';
import Hero from '../components/Hero';
import AchieveGoals from '../components/AchieveGoals';
import StatsBar from '../components/StatsBar';
import CourseCatalog from '../components/CourseCatalog';
import WhatWeOffer from '../components/WhatWeOffer';
import ComparisonTable from '../components/ComparisonTable';
import Testimonials from '../components/Testimonials';
import GlobalReach from '../components/GlobalReach';
import DualCtaBanner from '../components/DualCtaBanner';

export default function HomePage({ onOpenDemo }) {
  return (
    <div className="psittacus-home-view">
      {/* 1. Hero Section */}
      <Hero onOpenDemo={onOpenDemo} />

      {/* 2. Achieve Your Goals With Psittacus */}
      <AchieveGoals />

      {/* 3. Global Statistics Counter Bar */}
      <StatsBar />

      {/* 4. Explore Our Courses */}
      <CourseCatalog onSelectCourseForDemo={onOpenDemo} />

      {/* 5. What We Offer? */}
      <WhatWeOffer />

      {/* 6. Comparison: Psittacus Online Tuition VS Traditional Offline Tution */}
      <ComparisonTable onOpenDemo={onOpenDemo} />

      {/* 7. What Parents & Students Say About Psittacus */}
      <Testimonials />

      {/* 8. Our Students Across The Globe */}
      <GlobalReach />

      {/* 9. Dual CTA Banner (Explore Courses & Book A Free Demo) */}
      <DualCtaBanner onOpenDemo={onOpenDemo} />
    </div>
  );
}

