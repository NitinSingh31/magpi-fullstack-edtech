import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import FloatingActions from './components/FloatingActions';
import AdminPanel from './components/AdminPanel';

// Dedicated Pages matching psittacuslab.com structure
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OnlineTuitionPage from './pages/OnlineTuitionPage';
import EventsPage from './pages/EventsPage';
import CommunicationPage from './pages/CommunicationPage';
import CodingPage from './pages/CodingPage';
import LanguagesPage from './pages/LanguagesPage';
import AptitudePage from './pages/AptitudePage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCourseForDemo, setSelectedCourseForDemo] = useState('');

  const handleOpenDemo = (courseTitle = '') => {
    setSelectedCourseForDemo(courseTitle);
    setIsDemoOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoOpen(false);
    setSelectedCourseForDemo('');
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="magpi-app">
        {/* Navigation Header */}
        <Navbar 
          onOpenDemo={() => handleOpenDemo()} 
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Dynamic Route View - Dedicated Pages */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage onOpenDemo={handleOpenDemo} />} />
            <Route path="/about-us" element={<AboutPage onOpenDemo={handleOpenDemo} />} />
            <Route path="/online-tuition" element={<OnlineTuitionPage onOpenDemo={handleOpenDemo} />} />
            <Route path="/events" element={<EventsPage onOpenDemo={handleOpenDemo} />} />
            <Route path="/upcoming-events" element={<EventsPage onOpenDemo={handleOpenDemo} />} />
            
            {/* Skill Courses Dedicated Pages */}
            <Route path="/communication" element={<CommunicationPage onOpenDemo={handleOpenDemo} />} />
            <Route path="/coding-and-programming" element={<CodingPage onOpenDemo={handleOpenDemo} />} />
            <Route path="/language-classes" element={<LanguagesPage onOpenDemo={handleOpenDemo} />} />
            <Route path="/languages" element={<LanguagesPage onOpenDemo={handleOpenDemo} />} />
            <Route path="/reasoning-and-aptitude" element={<AptitudePage onOpenDemo={handleOpenDemo} />} />

            {/* Careers & Contact Pages */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact-us" element={<ContactPage onOpenDemo={handleOpenDemo} />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage onOpenDemo={handleOpenDemo} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer 
          onOpenDemo={() => handleOpenDemo()} 
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Floating Action Buttons */}
        <FloatingActions onOpenDemo={() => handleOpenDemo()} />

        {/* Interactive Free Demo Booking Modal */}
        <DemoModal 
          isOpen={isDemoOpen} 
          onClose={handleCloseDemo} 
          initialCourse={selectedCourseForDemo}
        />

        {/* Full-Featured Admin Leads Management Portal */}
        <AdminPanel 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}
