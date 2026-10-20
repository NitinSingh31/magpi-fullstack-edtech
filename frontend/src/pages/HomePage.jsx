import React from 'react';
import Hero from '../components/Hero';
import AchieveGoals from '../components/AchieveGoals';
import StatsBar from '../components/StatsBar';
import CurriculumsSection from '../components/CurriculumsSection';
import CourseCatalog from '../components/CourseCatalog';
import Methodology from '../components/Methodology';
import ComparisonTable from '../components/ComparisonTable';
import Testimonials from '../components/Testimonials';
import GlobalReach from '../components/GlobalReach';
import FAQ from '../components/FAQ';

export default function HomePage({ onOpenDemo }) {
  return (
    <div className="home-page-view">
      {/* 1. Hero Section */}
      <Hero onOpenDemo={onOpenDemo} />

      {/* 2. Achieve Your Goals Benefits Strip (Psittacus Lab Alignment) */}
      <AchieveGoals />

      {/* 3. Global Statistics Counter */}
      <StatsBar />

      {/* 4. Curriculums We Specialize In (Cambridge, IB, SABIS, AP) */}
      <CurriculumsSection onOpenDemo={onOpenDemo} />

      {/* 5. Comprehensive Courses & Skill Categories Explorer */}
      <CourseCatalog onSelectCourseForDemo={onOpenDemo} />

      {/* 6. 4-Step Learning Methodology */}
      <Methodology onOpenDemo={onOpenDemo} />

      {/* 7. Value Comparison Table (Magπ vs Traditional Offline) */}
      <ComparisonTable onOpenDemo={onOpenDemo} />

      {/* 8. Real Parent & Student Testimonials */}
      <Testimonials />

      {/* 9. International Student Community & Timezones */}
      <GlobalReach />

      {/* 10. Frequently Asked Questions */}
      <FAQ />
    </div>
  );
}
