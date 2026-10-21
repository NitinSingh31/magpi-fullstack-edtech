import React from 'react';
import Hero from '../components/Hero';
import AchieveGoals from '../components/AchieveGoals';
import StatsBar from '../components/StatsBar';
import CurriculumsSection from '../components/CurriculumsSection';
import CourseCatalog from '../components/CourseCatalog';
import TutorMatcher from '../components/TutorMatcher';
import Methodology from '../components/Methodology';
import FacultyShowcase from '../components/FacultyShowcase';
import ComparisonTable from '../components/ComparisonTable';
import TuitionCalculator from '../components/TuitionCalculator';
import Testimonials from '../components/Testimonials';
import ResourceHub from '../components/ResourceHub';
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

      {/* 6. AI 45-Second Tutor Matchmaker Quiz */}
      <TutorMatcher onOpenDemo={onOpenDemo} />

      {/* 7. 4-Step Learning Methodology */}
      <Methodology onOpenDemo={onOpenDemo} />

      {/* 8. Top 1% Global Faculty & Board Examiners Showcase */}
      <FacultyShowcase onOpenDemo={onOpenDemo} />

      {/* 9. Value Comparison Table (Magπ vs Traditional Offline) */}
      <ComparisonTable onOpenDemo={onOpenDemo} />

      {/* 10. Interactive Tuition Fee & Package Savings Calculator */}
      <TuitionCalculator onOpenDemo={onOpenDemo} />

      {/* 11. Real Parent & Student Testimonials */}
      <Testimonials />

      {/* 12. Free Study Resources & Revision Hub (Lead Magnet) */}
      <ResourceHub />

      {/* 13. International Student Community & Timezones */}
      <GlobalReach />

      {/* 14. Frequently Asked Questions */}
      <FAQ />
    </div>
  );
}
