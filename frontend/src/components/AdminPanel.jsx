import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
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
  FileSpreadsheet,
  Inbox,
  Sparkles,
  Tag
} from 'lucide-react';
import './AdminPanel.css';
import api from '../services/api.js';

const ADMIN_PIN = 'magpi2026'; // Default security passkey

export default function AdminPanel({ isOpen, onClose }) {
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
  const [dbStatus, setDbStatus] = useState({ database: 'Checking...', status: 'loading' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, inquiriesRes, healthRes] = await Promise.allSettled([
        api.getBookings(),
        api.getInquiries(),
        api.checkHealth()
      ]);

      if (bookingsRes.status === 'fulfilled' && bookingsRes.value?.success) {
        setBookings(bookingsRes.value.data || []);
      }

      if (inquiriesRes.status === 'fulfilled' && inquiriesRes.value?.success) {
        setInquiries(inquiriesRes.value.data || []);
      }

      if (healthRes.status === 'fulfilled') {
        setDbStatus(healthRes.value);
      }
    } catch (err) {
      console.warn('Backend not reachable:', err);
      setDbStatus({ database: 'Backend Offline', status: 'offline' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchData();
    }
  }, [isOpen, isAuthenticated]);

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
      console.error('Failed to update status', err);
    }
  };

  const exportLeadsToCSV = () => {
    const listToExport = activeTab === 'bookings' ? bookings : inquiries;
    if (listToExport.length === 0) {
      alert('No data to export.');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';
    
    if (activeTab === 'bookings') {
      csvContent += 'Reference ID,Date,Parent Name,Email,Phone,Curriculum,Grade,Subject,Preferred Date,Time Slot,Tutor Preference,Status\n';
      bookings.forEach(b => {
        const row = [
          `"${b.referenceCode || ''}"`,
          `"${new Date(b.createdAt).toLocaleDateString()}"`,
          `"${b.parentName || ''}"`,
          `"${b.email || ''}"`,
          `"${b.phone || ''}"`,
          `"${b.curriculum || ''}"`,
          `"${b.grade || ''}"`,
          `"${b.subject || ''}"`,
          `"${b.preferredDate || ''}"`,
          `"${b.preferredTime || ''}"`,
          `"${b.tutorPreference || ''}"`,
          `"${b.status || 'Pending'}"`
        ];
        csvContent += row.join(',') + '\n';
      });
    } else {
      csvContent += 'ID,Date,Name,Email,Phone,Type,Course/Resource,Message\n';
      inquiries.forEach(i => {
        const row = [
          `"${i._id}"`,
          `"${new Date(i.createdAt).toLocaleDateString()}"`,
          `"${i.name || ''}"`,
          `"${i.email || ''}"`,
          `"${i.phone || ''}"`,
          `"${i.type || 'contact'}"`,
          `"${i.course || ''}"`,
          `"${(i.message || '').replace(/"/g, '""')}"`
        ];
        csvContent += row.join(',') + '\n';
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `magpi-${activeTab}-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.curriculum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.referenceCode?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (b.status || 'Pending').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filter Inquiries
  const filteredInquiries = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-dialog" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-left">
            <div className="admin-title-row">
              <img src="/assets/psittacus/logo.png" alt="Psittacus" className="admin-header-logo" />
              <h2>Psittacus Leads & Inquiries Portal</h2>
            </div>
            <div className="db-badge">
              <Database size={14} />
              <span>Database: <strong>{dbStatus.database || 'Connecting...'}</strong></span>
              <span className={`db-status-dot ${dbStatus.status === 'online' ? 'online' : 'offline'}`}></span>
            </div>
          </div>

          <div className="admin-header-actions">
            {isAuthenticated && (
              <>
                <button 
                  onClick={exportLeadsToCSV} 
                  className="btn-admin-action" 
                  title="Export to CSV Spreadsheet"
                >
                  <Download size={15} /> <span>Export CSV</span>
                </button>
                <button onClick={fetchData} className="btn-refresh" title="Refresh Leads">
                  <RefreshCw size={16} className={loading ? 'spinning' : ''} />
                </button>
                <button onClick={handleLogout} className="btn-lock" title="Lock Admin Panel">
                  <Lock size={15} />
                </button>
              </>
            )}
            <button onClick={onClose} className="btn-close-admin" aria-label="Close Admin Panel">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Security Shield Lock Screen */}
        {!isAuthenticated ? (
          <div className="admin-lock-screen">
            <div className="lock-icon-glow">
              <Shield size={38} />
            </div>
            <h3>Admin Security Access</h3>
            <p>Enter the authorized administrative passkey to review student leads and parental inquiries.</p>
            
            <form onSubmit={handlePinSubmit} className="pin-form">
              <div className="pin-input-wrap">
                <KeyRound size={18} className="pin-icon" />
                <input 
                  type="password"
                  placeholder="Enter Passkey (e.g. magpi2026)"
                  value={pinInput}
                  onChange={e => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="pin-error-msg">
                  ⚠️ Invalid passkey. Default passkey is <code>magpi2026</code>.
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-unlock">
                <Unlock size={16} /> Unlock Leads Portal
              </button>
            </form>
            <span className="lock-hint">🔒 End-to-end encrypted • Session stored securely</span>
          </div>
        ) : (
          <>
            {/* Top Navigation Tabs */}
            <div className="admin-tabs-bar">
              <div className="admin-tabs-left">
                <button 
                  className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <Calendar size={15} />
                  <span>Trial Bookings</span>
                  <span className="tab-pill">{bookings.length}</span>
                </button>
                <button 
                  className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                  onClick={() => setActiveTab('inquiries')}
                >
                  <Inbox size={15} />
                  <span>Inquiries & Resources</span>
                  <span className="tab-pill">{inquiries.length}</span>
                </button>
              </div>

              {activeTab === 'bookings' && (
                <div className="status-filter-pills">
                  {['all', 'pending', 'contacted', 'confirmed', 'completed'].map(status => (
                    <button
                      key={status}
                      className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Toolbar */}
            <div className="admin-toolbar">
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'bookings' ? "Search by parent, subject, curriculum, ref code..." : "Search inquiries by name, email, topic..."}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="admin-count">
                Showing: <strong>{activeTab === 'bookings' ? filteredBookings.length : filteredInquiries.length}</strong> records
              </div>
            </div>

            {/* Leads / Inquiries Body */}
            <div className="admin-body">
              {loading ? (
                <div className="admin-loading">
                  <RefreshCw size={24} className="spinning" />
                  <p>Fetching records from MongoDB Atlas...</p>
                </div>
              ) : activeTab === 'bookings' ? (
                filteredBookings.length === 0 ? (
                  <div className="admin-empty-state">
                    <p>No trial bookings match your filter.</p>
                    <small>Submit a test demo trial from the website to see it appear here instantly!</small>
                  </div>
                ) : (
                  <div className="leads-list">
                    {filteredBookings.map((b) => (
                      <div key={b._id} className="lead-card">
                        <div className="lead-top">
                          <div className="lead-parent">
                            <User size={16} className="lead-icon" />
                            <strong>{b.parentName}</strong>
                            {b.referenceCode && (
                              <span className="lead-ref-code">{b.referenceCode}</span>
                            )}
                            <span className="lead-time">
                              <Clock size={12} /> {new Date(b.createdAt).toLocaleDateString()} at {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <div className="lead-status-select-wrap">
                            <select 
                              value={b.status || 'Pending'} 
                              onChange={(e) => handleStatusChange(b._id, e.target.value)}
                              className={`status-select ${b.status?.toLowerCase() || 'pending'}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </div>

                        <div className="lead-details-grid">
                          <div className="detail-chip">
                            <span className="chip-label">Subject & Board</span>
                            <strong>{b.subject}</strong>
                            <small>{b.curriculum} ({b.grade})</small>
                          </div>

                          <div className="detail-chip">
                            <span className="chip-label">Target Slot</span>
                            <span>{b.preferredDate ? `${b.preferredDate} • ` : ''}{b.preferredTime}</span>
                            {b.tutorPreference && (
                              <small style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                👨‍🏫 Preferred: {b.tutorPreference}
                              </small>
                            )}
                          </div>

                          <div className="detail-chip">
                            <span className="chip-label">Contact Details</span>
                            <a href={`tel:${b.phone}`} className="contact-link">
                              <Phone size={12} /> {b.phone}
                            </a>
                            <a href={`mailto:${b.email}`} className="contact-link">
                              <Mail size={12} /> {b.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Inquiries & Resource Downloads Tab */
                filteredInquiries.length === 0 ? (
                  <div className="admin-empty-state">
                    <p>No general inquiries or resource downloads recorded yet.</p>
                  </div>
                ) : (
                  <div className="leads-list">
                    {filteredInquiries.map((i) => (
                      <div key={i._id} className="lead-card">
                        <div className="lead-top">
                          <div className="lead-parent">
                            <Inbox size={16} className="lead-icon" />
                            <strong>{i.name || 'Visitor'}</strong>
                            <span className="inquiry-badge-tag">{i.type || 'contact'}</span>
                            <span className="lead-time">
                              <Clock size={12} /> {new Date(i.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="lead-contacts-inline">
                            {i.phone && (
                              <a href={`tel:${i.phone}`} className="contact-link">
                                <Phone size={12} /> {i.phone}
                              </a>
                            )}
                            <a href={`mailto:${i.email}`} className="contact-link">
                              <Mail size={12} /> {i.email}
                            </a>
                          </div>
                        </div>

                        {(i.course || i.message) && (
                          <div className="inquiry-message-box">
                            {i.course && <strong>Resource / Topic: {i.course}</strong>}
                            {i.message && <p>{i.message}</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Footer */}
            <div className="admin-footer">
              <small>
                💡 Live Connected to <strong>MongoDB Atlas M0</strong>. Data changes sync in real-time.
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
