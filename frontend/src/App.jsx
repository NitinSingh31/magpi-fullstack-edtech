import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import FloatingActions from './components/FloatingActions';

// Dedicated Pages matching structure
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
import AdminPage from './pages/AdminPage';

function AppContent() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedCourseForDemo, setSelectedCourseForDemo] = useState('');
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleOpenDemo = (courseTitle = '') => {
    setSelectedCourseForDemo(courseTitle);
    setIsDemoOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoOpen(false);
    setSelectedCourseForDemo('');
  };

  return (
    <div className="magpi-app">
      {/* Public Navigation Header - Hidden on Admin Dashboard */}
      {!isAdminRoute && (
        <Navbar onOpenDemo={() => handleOpenDemo()} />
      )}

      {/* Dynamic Route View */}
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

          {/* Dedicated Protected Admin Route */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage onOpenDemo={handleOpenDemo} />} />
        </Routes>
      </main>

      {/* Public Footer & Floating Widgets - Hidden on Admin Dashboard */}
      {!isAdminRoute && (
        <>
          <Footer onOpenDemo={() => handleOpenDemo()} />
          <FloatingActions onOpenDemo={() => handleOpenDemo()} />
          <DemoModal 
            isOpen={isDemoOpen} 
            onClose={handleCloseDemo} 
            initialCourse={selectedCourseForDemo}
          />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
