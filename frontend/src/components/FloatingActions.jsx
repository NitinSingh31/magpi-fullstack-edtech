import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import './FloatingActions.css';

export default function FloatingActions({ onOpenDemo }) {
  return (
    <div className="floating-actions-container">
      {/* Mobile Quick Book Button */}
      <button 
        onClick={onOpenDemo}
        className="floating-book-btn d-mobile-only"
        aria-label="Book Free Trial"
      >
        <Sparkles size={16} />
        <span>Book Free Trial</span>
      </button>

      {/* Floating WhatsApp Quick Connect */}
      <a 
        href="https://wa.me/916283609913?text=Hello%20Mag%CF%80,%20I%20would%20like%20to%20know%20more%20about%20your%201-on-1%20tuition%20classes."
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp-btn"
        aria-label="Chat with Academic Advisor on WhatsApp"
      >
        <span className="whatsapp-tooltip">Chat with Academic Advisor</span>
        <div className="whatsapp-badge-pulse"></div>
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
