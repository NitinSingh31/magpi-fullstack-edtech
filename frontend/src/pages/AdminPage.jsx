import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  Calendar,
  Shield, 
  Search, 
  Download, 
  Lock, 
  Unlock, 
  KeyRound, 
  Inbox, 
  ArrowLeft
} from 'lucide-react';
import './AdminPage.css';
import api from '../services/api.js';

const ADMIN_PIN = 'magpi2026'; // Default security passkey

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('magpi_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'inquiries'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, inquiriesRes] = await Promise.allSettled([
        api.getBookings(),
        api.getInquiries()
      ]);

      if (bookingsRes.status === 'fulfilled' && bookingsRes.value?.success) {
        setBookings(bookingsRes.value.data || []);
      }

      if (inquiriesRes.status === 'fulfilled' && inquiriesRes.value?.success) {
        setInquiries(inquiriesRes.value.data || []);
      }
    } catch (err) {
      console.warn('Backend not reachable:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('magpi_admin_auth', 'true');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('magpi_admin_auth');
    setPinInput('');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateBookingStatus(id, { status: newStatus });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error('Failed to update booking status:', err);
      alert('Could not update status. Please ensure your backend is reachable.');
    }
  };

  const exportLeadsToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (activeTab === 'bookings') {
      csvContent += "Reference,Parent Name,Phone,Email,Curriculum,Grade,Subject,Preferred Date,Time,Tutor Preference,Status,Booking Date\n";
      bookings.forEach(b => {
        csvContent += `"${b.referenceCode || ''}","${b.parentName || ''}","${b.phone || ''}","${b.email || ''}","${b.curriculum || ''}","${b.grade || ''}","${b.subject || ''}","${b.preferredDate || ''}","${b.preferredTime || ''}","${b.tutorPreference || ''}","${b.status || 'Pending'}","${b.createdAt ? new Date(b.createdAt).toISOString() : ''}"\n`;
      });
    } else {
      csvContent += "Name,Phone,Email,Topic/Course,Message,Type,Date\n";
      inquiries.forEach(i => {
        csvContent += `"${i.name || ''}","${i.phone || ''}","${i.email || ''}","${i.course || ''}","${(i.message || '').replace(/"/g, '""')}","${i.type || 'contact'}","${i.createdAt ? new Date(i.createdAt).toISOString() : ''}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `magpi_${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.includes(searchTerm) ||
      b.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.curriculum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.referenceCode?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (b.status || 'Pending').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filter Inquiries
  const filteredInquiries = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.phone?.includes(searchTerm) ||
    i.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page-container">
      {/* Top Dedicated Admin Navigation Bar */}
      <header className="admin-page-navbar">
        <div className="admin-navbar-left">
          <Link to="/" className="btn-admin-nav" title="Return to public site">
            <ArrowLeft size={16} /> <span>Back to Website</span>
          </Link>
          <img src="/assets/magpi-logo.png" alt="Magπ" className="admin-page-logo" />
          <div className="admin-navbar-title">
            <h1>Magπ Administration & Leads CRM</h1>
            <span>Protected Management Portal</span>
          </div>
        </div>

        <div className="admin-navbar-right">
          {isAuthenticated && (
            <>
              <button onClick={exportLeadsToCSV} className="btn-admin-nav" title="Export CSV">
                <Download size={15} /> <span>Export CSV</span>
              </button>
              <button onClick={fetchData} className="btn-admin-nav" title="Refresh records">
                <RefreshCw size={15} className={loading ? 'spinning-icon' : ''} /> <span>Refresh</span>
              </button>
              <button onClick={handleLogout} className="btn-admin-nav logout-btn" title="Log out">
                <Lock size={15} /> <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* Security Passkey Lock Screen */}
      {!isAuthenticated ? (
        <div className="admin-lock-wrapper">
          <div className="admin-lock-card">
            <div className="lock-avatar-shield">
              <Shield size={36} />
            </div>
            <h2>Admin Portal Access</h2>
            <p>Enter the master security passkey to view student bookings, parent leads, and inquiries.</p>

            <form onSubmit={handlePinSubmit} className="admin-pin-form">
              <div className="pin-field-group">
                <KeyRound size={18} className="pin-field-icon" />
                <input 
                  type="password"
                  placeholder="Enter Passkey (e.g. magpi2026)"
                  value={pinInput}
                  onChange={e => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="pin-input"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="pin-error-alert">
                  ⚠️ Invalid passkey. Default passkey is <code>magpi2026</code>.
                </div>
              )}

              <button type="submit" className="btn-unlock-submit">
                <Unlock size={17} /> Unlock Portal
              </button>
            </form>

            <Link to="/" className="back-to-site-link">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      ) : (
        /* Main Logged-In Dashboard */
        <main className="admin-page-main">
          <div className="admin-card-surface">
            {/* Control Strip & Tabs */}
            <div className="admin-control-strip">
              <div className="admin-nav-tabs">
                <button 
                  className={`tab-pill-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <Calendar size={16} />
                  <span>Trial Bookings</span>
                  <span className="tab-badge">{bookings.length}</span>
                </button>
                <button 
                  className={`tab-pill-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                  onClick={() => setActiveTab('inquiries')}
                >
                  <Inbox size={16} />
                  <span>Inquiries & Messages</span>
                  <span className="tab-badge">{inquiries.length}</span>
                </button>
              </div>

              {activeTab === 'bookings' && (
                <div className="status-pills-row">
                  {['all', 'pending', 'contacted', 'confirmed', 'completed'].map(st => (
                    <button
                      key={st}
                      className={`status-pill-opt ${statusFilter === st ? 'active' : ''}`}
                      onClick={() => setStatusFilter(st)}
                    >
                      {st.charAt(0).toUpperCase() + st.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Toolbar */}
            <div className="admin-search-strip">
              <div className="admin-search-wrapper">
                <Search size={16} className="search-icon-svg" />
                <input 
                  type="text"
                  placeholder={activeTab === 'bookings' ? "Search parent, subject, curriculum, phone, ref code..." : "Search by name, email, phone, message..."}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                />
              </div>
              <div className="admin-record-counter">
                Showing: <strong>{activeTab === 'bookings' ? filteredBookings.length : filteredInquiries.length}</strong> records
              </div>
            </div>

            {/* Records Deck */}
            <div className="admin-records-viewport">
              {loading ? (
                <div className="admin-state-view">
                  <RefreshCw size={28} className="spinning-icon" />
                  <p>Fetching records from MongoDB Atlas...</p>
                </div>
              ) : activeTab === 'bookings' ? (
                filteredBookings.length === 0 ? (
                  <div className="admin-state-view">
                    <p>No trial bookings found matching your search/filter.</p>
                  </div>
                ) : (
                  <div className="lead-cards-deck">
                    {filteredBookings.map((b) => (
                      <div key={b._id} className="admin-lead-row-card">
                        <div className="lead-row-header">
                          <div className="lead-row-user">
                            <div className="lead-user-avatar">
                              <User size={18} />
                            </div>
                            <div>
                              <span className="lead-user-name">{b.parentName}</span>
                              {b.referenceCode && (
                                <span className="lead-ref-pill" style={{ marginLeft: '0.5rem' }}>
                                  #{b.referenceCode}
                                </span>
                              )}
                            </div>
                            <span className="lead-date-stamp">
                              <Clock size={12} /> {new Date(b.createdAt).toLocaleDateString()} at {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <select 
                            value={b.status || 'Pending'} 
                            onChange={(e) => handleStatusChange(b._id, e.target.value)}
                            className={`status-dropdown ${(b.status || 'pending').toLowerCase()}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>

                        <div className="lead-info-tiles">
                          <div className="info-tile">
                            <span className="info-tile-label">Subject & Curriculum</span>
                            <span className="info-tile-val">{b.subject}</span>
                            <span className="info-tile-sub">{b.curriculum} ({b.grade})</span>
                          </div>

                          <div className="info-tile">
                            <span className="info-tile-label">Requested Slot</span>
                            <span className="info-tile-val">{b.preferredDate || 'Upcoming'}</span>
                            <span className="info-tile-sub">{b.preferredTime}</span>
                            {b.tutorPreference && (
                              <span className="info-tile-sub" style={{ color: '#0072CE', fontWeight: 600 }}>
                                👨‍🏫 {b.tutorPreference}
                              </span>
                            )}
                          </div>

                          <div className="info-tile">
                            <span className="info-tile-label">Parent Contact</span>
                            <a href={`tel:${b.phone}`} className="contact-action-btn">
                              <Phone size={13} /> {b.phone}
                            </a>
                            <a href={`mailto:${b.email}`} className="contact-action-btn">
                              <Mail size={13} /> {b.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Inquiries Tab */
                filteredInquiries.length === 0 ? (
                  <div className="admin-state-view">
                    <p>No inquiries found matching your search.</p>
                  </div>
                ) : (
                  <div className="lead-cards-deck">
                    {filteredInquiries.map((i) => (
                      <div key={i._id} className="admin-lead-row-card">
                        <div className="lead-row-header">
                          <div className="lead-row-user">
                            <div className="lead-user-avatar">
                              <Inbox size={18} />
                            </div>
                            <div>
                              <span className="lead-user-name">{i.name || 'Website Visitor'}</span>
                              <span className="lead-ref-pill" style={{ marginLeft: '0.5rem' }}>
                                {i.type || 'contact'}
                              </span>
                            </div>
                            <span className="lead-date-stamp">
                              <Clock size={12} /> {new Date(i.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {i.phone && (
                              <a href={`tel:${i.phone}`} className="contact-action-btn">
                                <Phone size={14} /> {i.phone}
                              </a>
                            )}
                            <a href={`mailto:${i.email}`} className="contact-action-btn">
                              <Mail size={14} /> {i.email}
                            </a>
                          </div>
                        </div>

                        {(i.course || i.message) && (
                          <div className="lead-message-quote">
                            {i.course && <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Topic: {i.course}</div>}
                            {i.message && <div>{i.message}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
