import React from 'react';
import './GlobalReach.css';

const COUNTRIES = [
  { name: 'Australia', flag: '/assets/psittacus/flag-australia.png' },
  { name: 'UAE', flag: '/assets/psittacus/flag-uae.png' },
  { name: 'Canada', flag: '/assets/psittacus/flag-canada.png' },
  { name: 'Singapore', flag: '/assets/psittacus/flag-singapore.png' },
  { name: 'Kuwait', flag: '/assets/psittacus/flag-kuwait.png' },
  { name: 'Netherlands', flag: '/assets/psittacus/flag-netherlands.png' },
  { name: 'India', flag: '/assets/psittacus/flag-india.png' },
  { name: 'USA', flag: '/assets/psittacus/flag-usa.png' },
  { name: 'United Kingdom', flag: '/assets/psittacus/flag-uk.png' },
  { name: 'New Zealand', flag: '/assets/psittacus/flag-nz.png' },
  { name: 'Saudi Arabia', flag: '/assets/psittacus/flag-saudi.png' },
  { name: 'South Africa', flag: '/assets/psittacus/flag-southafrica.png' }
];

export default function GlobalReach() {
  return (
    <section className="psittacus-global-section" id="global">
      <div className="container">
        <div className="psittacus-header">
          <h2 className="psittacus-title">Our Students Across The Globe</h2>
        </div>

        <div className="global-countries-grid">
          {COUNTRIES.map((c, index) => (
            <div key={index} className="country-flag-card">
              <div className="flag-icon-wrap">
                <img src={c.flag} alt={c.name} className="country-flag-img" />
              </div>
              <span className="country-flag-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
