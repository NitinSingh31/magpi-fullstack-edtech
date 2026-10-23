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
  ArrowLeft,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  MapPin,
  DollarSign,
  Layers,
  Sparkles,
  Users,
  FileText
} from 'lucide-react';
import './AdminPage.css';
import api from '../services/api.js';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(
      sessionStorage.getItem('magpi_admin_auth') === 'true' &&
      sessionStorage.getItem('magpi_admin_token')
    );
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [pinErrorMessage, setPinErrorMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'inquiries' | 'careers' | 'applications'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Career Modal State
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    type: 'Part-time / Full-time Remote',
    location: 'Global (Remote)',
    compensation: '$35 - $65 / hr',
    boards: '',
    requirements: '',
    isActive: true
  });
  const [savingJob, setSavingJob] = useState(false);

  const fetchData = async () => {
    if (!sessionStorage.getItem('magpi_admin_token')) {
      setIsAuthenticated(false);
      return;
    }

    setLoading(true);
    try {
      const [bookingsRes, inquiriesRes, careersRes, applicationsRes] = await Promise.allSettled([
        api.getBookings(),
        api.getInquiries(),
        api.getCareerOpenings(),
        api.getFacultyApplications()
      ]);

      if (bookingsRes.status === 'fulfilled' && bookingsRes.value?.success) {
        setBookings(bookingsRes.value.data || []);
      }

      if (inquiriesRes.status === 'fulfilled' && inquiriesRes.value?.success) {
        setInquiries(inquiriesRes.value.data || []);
      }

      if (careersRes.status === 'fulfilled' && careersRes.value?.success) {
        setCareers(careersRes.value.data || []);
      }

      if (applicationsRes.status === 'fulfilled' && applicationsRes.value?.success) {
        setApplications(applicationsRes.value.data || []);
      }
    } catch (err) {
      console.warn('Backend not reachable:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('magpi_admin_token');
    if (token) {
      api.verifyAdminSession()
        .then(() => {
          setIsAuthenticated(true);
          fetchData();
        })
        .catch(() => {
          setIsAuthenticated(false);
          sessionStorage.removeItem('magpi_admin_token');
          sessionStorage.removeItem('magpi_admin_auth');
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    setIsAuthenticating(true);
    setPinError(false);
    setPinErrorMessage('');

    try {
      const res = await api.loginAdmin(pinInput.trim());
      if (res.success && res.token) {
        sessionStorage.setItem('magpi_admin_token', res.token);
        sessionStorage.setItem('magpi_admin_auth', 'true');
        setIsAuthenticated(true);
        setPinInput('');
      } else {
        setPinError(true);
        setPinErrorMessage(res.error || 'Invalid security passkey.');
      }
    } catch (err) {
      setPinError(true);
      setPinErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('magpi_admin_token');
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

  const handleApplicationStatusChange = async (id, newStatus) => {
    try {
      await api.updateFacultyApplicationStatus(id, newStatus);
      setApplications(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert('Failed to update application status: ' + err.message);
    }
  };

  // --- Career Openings Actions ---
  const handleOpenAddJob = () => {
    setEditingJob(null);
    setJobFormData({
      title: '',
      type: 'Part-time / Full-time Remote',
      location: 'Global (Remote)',
      compensation: '$35 - $65 / hr',
      boards: '',
      requirements: '',
      isActive: true
    });
    setIsJobModalOpen(true);
  };

  const handleOpenEditJob = (job) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title || '',
      type: job.type || 'Part-time / Full-time Remote',
      location: job.location || 'Global (Remote)',
      compensation: job.compensation || '$35 - $65 / hr',
      boards: job.boards || '',
      requirements: job.requirements || '',
      isActive: job.isActive !== false
    });
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!jobFormData.title.trim()) {
      alert('Please provide a job title.');
      return;
    }
    setSavingJob(true);
    try {
      if (editingJob) {
        const res = await api.updateCareerOpening(editingJob._id, jobFormData);
        if (res.success && res.data) {
          setCareers(prev => prev.map(c => c._id === editingJob._id ? res.data : c));
        }
      } else {
        const res = await api.createCareerOpening(jobFormData);
        if (res.success && res.data) {
          setCareers(prev => [res.data, ...prev]);
        }
      }
      setIsJobModalOpen(false);
    } catch (err) {
      alert('Failed to save opening: ' + (err.message || 'Unknown error'));
    } finally {
      setSavingJob(false);
    }
  };

  const handleToggleJobStatus = async (job) => {
    const updatedStatus = !job.isActive;
    try {
      const res = await api.updateCareerOpening(job._id, { isActive: updatedStatus });
      if (res.success) {
        setCareers(prev => prev.map(c => c._id === job._id ? { ...c, isActive: updatedStatus } : c));
      }
    } catch (err) {
      alert('Failed to update opening status: ' + err.message);
    }
  };

  const handleDeleteJob = async (job) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${job.title}"?`)) {
      return;
    }
    try {
      const res = await api.deleteCareerOpening(job._id);
      if (res.success) {
        setCareers(prev => prev.filter(c => c._id !== job._id));
      }
    } catch (err) {
      alert('Failed to delete opening: ' + err.message);
    }
  };

  const exportLeadsToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (activeTab === 'bookings') {
      csvContent += "Reference,Parent Name,Phone,Email,Curriculum,Grade,Subject,Preferred Date,Time,Tutor Preference,Status,Booking Date\n";
      bookings.forEach(b => {
        csvContent += `"${b.referenceCode || ''}","${b.parentName || ''}","${b.phone || ''}","${b.email || ''}","${b.curriculum || ''}","${b.grade || ''}","${b.subject || ''}","${b.preferredDate || ''}","${b.preferredTime || ''}","${b.tutorPreference || ''}","${b.status || 'Pending'}","${b.createdAt ? new Date(b.createdAt).toISOString() : ''}"\n`;
      });
    } else if (activeTab === 'inquiries') {
      csvContent += "Name,Phone,Email,Topic/Course,Message,Type,Date\n";
      inquiries.forEach(i => {
        csvContent += `"${i.name || ''}","${i.phone || ''}","${i.email || ''}","${i.course || ''}","${(i.message || '').replace(/"/g, '""')}","${i.type || 'contact'}","${i.createdAt ? new Date(i.createdAt).toISOString() : ''}"\n`;
      });
    } else if (activeTab === 'careers') {
      csvContent += "Title,Type,Location,Compensation,Boards,Requirements,Status,Date\n";
      careers.forEach(c => {
        csvContent += `"${c.title || ''}","${c.type || ''}","${c.location || ''}","${c.compensation || ''}","${c.boards || ''}","${(c.requirements || '').replace(/"/g, '""')}","${c.isActive !== false ? 'Active' : 'Paused'}","${c.createdAt ? new Date(c.createdAt).toISOString() : ''}"\n`;
      });
    } else {
      csvContent += "Candidate Name,Email,Phone,Role Applied,Experience,Qualification,Subject,LinkedIn,Resume File,Status,Date\n";
      applications.forEach(a => {
        csvContent += `"${a.name || ''}","${a.email || ''}","${a.phone || ''}","${a.role || ''}","${a.experience || ''}","${a.qualification || ''}","${a.subject || ''}","${a.linkedin || ''}","${a.resume?.fileName || 'None'}","${a.status || 'New'}","${a.createdAt ? new Date(a.createdAt).toISOString() : ''}"\n`;
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

  // Filter Careers
  const filteredCareers = careers.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.boards?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.requirements?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Applications
  const filteredApplications = applications.filter(a =>
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.phone?.includes(searchTerm) ||
    a.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.qualification?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.notes?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <p>Enter the master security passkey to view student bookings, parent leads, and manage career openings & teacher applications.</p>

            <form onSubmit={handlePinSubmit} className="admin-pin-form">
              <div className="pin-field-group">
                <KeyRound size={18} className="pin-field-icon" />
                <input 
                  type="password"
                  placeholder="Enter Admin Security Passkey"
                  value={pinInput}
                  disabled={isAuthenticating}
                  onChange={e => {
                    setPinInput(e.target.value);
                    setPinError(false);
                    setPinErrorMessage('');
                  }}
                  className="pin-input"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="pin-error-alert">
                  {pinErrorMessage || '⚠️ Invalid security passkey. Access denied.'}
                </div>
              )}

              <button type="submit" className="btn-unlock-submit" disabled={isAuthenticating || !pinInput.trim()}>
                {isAuthenticating ? (
                  <>
                    <RefreshCw size={17} className="spinning-icon" /> Verifying...
                  </>
                ) : (
                  <>
                    <Unlock size={17} /> Unlock Portal
                  </>
                )}
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
                <button 
                  className={`tab-pill-btn ${activeTab === 'careers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('careers')}
                >
                  <Briefcase size={16} />
                  <span>Career Openings</span>
                  <span className="tab-badge">{careers.length}</span>
                </button>
                <button 
                  className={`tab-pill-btn ${activeTab === 'applications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  <Users size={16} />
                  <span>Faculty Applications</span>
                  <span className="tab-badge">{applications.length}</span>
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

            {/* Search Toolbar & Action Strip */}
            <div className="admin-search-strip">
              <div className="admin-search-wrapper">
                <Search size={16} className="search-icon-svg" />
                <input 
                  type="text"
                  placeholder={
                    activeTab === 'bookings' 
                      ? "Search parent, subject, curriculum, phone, ref code..." 
                      : activeTab === 'inquiries' 
                        ? "Search by name, email, phone, message..." 
                        : activeTab === 'careers'
                          ? "Search job openings by title, curriculum, location..."
                          : "Search candidate name, email, phone, role, subjects, qualifications..."
                  }
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="admin-record-counter">
                  Showing: <strong>
                    {activeTab === 'bookings' 
                      ? filteredBookings.length 
                      : activeTab === 'inquiries' 
                        ? filteredInquiries.length 
                        : activeTab === 'careers'
                          ? filteredCareers.length
                          : filteredApplications.length}
                  </strong> records
                </div>

                {activeTab === 'careers' && (
                  <button onClick={handleOpenAddJob} className="btn-add-opening">
                    <Plus size={16} /> <span>Add New Opening</span>
                  </button>
                )}
              </div>
            </div>

            {/* Records Deck */}
            <div className="admin-records-viewport">
              {loading ? (
                <div className="admin-state-view">
                  <RefreshCw size={28} className="spinning-icon" />
                  <p>Fetching records from storage...</p>
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
              ) : activeTab === 'inquiries' ? (
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
              ) : activeTab === 'careers' ? (
                /* Career Openings Tab */
                filteredCareers.length === 0 ? (
                  <div className="admin-state-view">
                    <Briefcase size={36} color="#94A3B8" />
                    <p>No career openings found. Click "+ Add New Opening" above to create one.</p>
                  </div>
                ) : (
                  <div className="career-cards-deck">
                    {filteredCareers.map((job) => (
                      <div key={job._id} className={`admin-career-card ${job.isActive === false ? 'paused' : ''}`}>
                        <div className="career-card-top-row">
                          <div className="career-title-block">
                            <div className="career-badges-row">
                              <span className="career-type-pill">{job.type}</span>
                              <span className={`career-status-pill ${job.isActive !== false ? 'active' : 'paused'}`}>
                                {job.isActive !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                                {job.isActive !== false ? 'Active on Website' : 'Paused / Hidden'}
                              </span>
                            </div>
                            <h3 className="career-title-text">{job.title}</h3>
                          </div>

                          <div className="career-card-actions">
                            <button 
                              onClick={() => handleToggleJobStatus(job)} 
                              className="btn-career-act"
                              title={job.isActive !== false ? "Hide from website" : "Show on website"}
                            >
                              {job.isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                              <span>{job.isActive !== false ? 'Pause' : 'Activate'}</span>
                            </button>
                            <button 
                              onClick={() => handleOpenEditJob(job)} 
                              className="btn-career-act edit-act"
                              title="Edit role details"
                            >
                              <Edit2 size={14} />
                              <span>Edit</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteJob(job)} 
                              className="btn-career-act delete-act"
                              title="Delete opening"
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                        <div className="career-meta-grid">
                          <div className="info-tile">
                            <span className="info-tile-label">Location / Mode</span>
                            <span className="info-tile-val">📍 {job.location || 'Global (Remote)'}</span>
                          </div>
                          <div className="info-tile">
                            <span className="info-tile-label">Compensation</span>
                            <span className="info-tile-val" style={{ color: '#0072CE' }}>💰 {job.compensation || 'Flexible'}</span>
                          </div>
                          <div className="info-tile">
                            <span className="info-tile-label">Curriculums & Boards</span>
                            <span className="info-tile-val">🎯 {job.boards || 'All Boards'}</span>
                          </div>
                        </div>

                        {job.requirements && (
                          <div className="career-requirements-box">
                            <strong>Requirements:</strong> {job.requirements}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Faculty Applications Tab */
                filteredApplications.length === 0 ? (
                  <div className="admin-state-view">
                    <Users size={36} color="#94A3B8" />
                    <p>No faculty applications received yet.</p>
                  </div>
                ) : (
                  <div className="lead-cards-deck">
                    {filteredApplications.map((app) => (
                      <div key={app._id} className="admin-lead-row-card">
                        <div className="lead-row-header">
                          <div className="lead-row-user">
                            <div className="lead-user-avatar" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                              <User size={18} />
                            </div>
                            <div>
                              <span className="lead-user-name">{app.name}</span>
                              <span className="lead-ref-pill" style={{ marginLeft: '0.5rem', background: '#EFF6FF', color: '#1E40AF' }}>
                                {app.role || 'Teacher'}
                              </span>
                            </div>
                            <span className="lead-date-stamp">
                              <Clock size={12} /> Applied on {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <select 
                            value={app.status || 'New'} 
                            onChange={(e) => handleApplicationStatusChange(app._id, e.target.value)}
                            className={`status-dropdown ${(app.status || 'new').toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <option value="New">New Candidate</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>

                        <div className="lead-info-tiles">
                          <div className="info-tile">
                            <span className="info-tile-label">Teaching Experience & Degree</span>
                            <span className="info-tile-val">{app.experience}</span>
                            <span className="info-tile-sub">{app.qualification || 'Not provided'}</span>
                          </div>

                          <div className="info-tile">
                            <span className="info-tile-label">Subject & Curriculums</span>
                            <span className="info-tile-val">{app.subject || 'All Subjects'}</span>
                            {app.linkedin && (
                              <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="info-tile-sub" style={{ color: '#0072CE', fontWeight: 600 }}>
                                🔗 View LinkedIn Profile
                              </a>
                            )}
                          </div>

                          <div className="info-tile">
                            <span className="info-tile-label">Candidate Contact</span>
                            <a href={`tel:${app.phone}`} className="contact-action-btn">
                              <Phone size={13} /> {app.phone}
                            </a>
                            <a href={`mailto:${app.email}`} className="contact-action-btn">
                              <Mail size={13} /> {app.email}
                            </a>
                          </div>
                        </div>

                        {app.notes && (
                          <div className="lead-message-quote" style={{ marginTop: '0.85rem' }}>
                            <strong>Teaching Philosophy:</strong> {app.notes}
                          </div>
                        )}

                        {/* Resume Box */}
                        <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem' }}>
                            <FileText size={16} color="#0072CE" />
                            <span><strong>Resume Document:</strong> {app.resume?.fileName ? app.resume.fileName : 'No file attached'}</span>
                            {app.resume?.fileSize > 0 && (
                              <span style={{ color: '#94A3B8' }}>({(app.resume.fileSize / 1024).toFixed(1)} KB)</span>
                            )}
                          </div>

                          {app.resume?.fileData ? (
                            <a 
                              href={app.resume.fileData} 
                              download={app.resume.fileName || 'Candidate_Resume.pdf'}
                              className="btn-download-resume"
                            >
                              <Download size={14} /> Download Resume
                            </a>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontStyle: 'italic' }}>No resume file attached</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      )}

      {/* Career Opening Add / Edit Modal */}
      {isJobModalOpen && (
        <div className="career-modal-backdrop" onClick={() => setIsJobModalOpen(false)}>
          <div className="career-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="career-modal-header">
              <h3>{editingJob ? 'Edit Career Opening' : 'Add New Career Opening'}</h3>
              <button 
                onClick={() => setIsJobModalOpen(false)} 
                className="career-modal-close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="career-form-grid">
              <div className="form-group">
                <label>Job Title *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Cambridge IGCSE & A-Level Mathematics Faculty"
                  value={jobFormData.title}
                  onChange={e => setJobFormData({ ...jobFormData, title: e.target.value })}
                />
              </div>

              <div className="career-form-row">
                <div className="form-group">
                  <label>Employment Type *</label>
                  <select 
                    value={jobFormData.type}
                    onChange={e => setJobFormData({ ...jobFormData, type: e.target.value })}
                  >
                    <option value="Part-time / Full-time Remote">Part-time / Full-time Remote</option>
                    <option value="Remote Flexible">Remote Flexible</option>
                    <option value="Full-time Remote">Full-time Remote</option>
                    <option value="Part-time Remote">Part-time Remote</option>
                    <option value="Contract / Project-based">Contract / Project-based</option>
                    <option value="On-site / Hybrid">On-site / Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Global (Remote) or Ludhiana, India"
                    value={jobFormData.location}
                    onChange={e => setJobFormData({ ...jobFormData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="career-form-row">
                <div className="form-group">
                  <label>Compensation / Pay Rate</label>
                  <input 
                    type="text"
                    placeholder="e.g. $35 - $65 / hr or ₹6 - ₹10 LPA"
                    value={jobFormData.compensation}
                    onChange={e => setJobFormData({ ...jobFormData, compensation: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Display Status on Website</label>
                  <select 
                    value={jobFormData.isActive ? 'active' : 'paused'}
                    onChange={e => setJobFormData({ ...jobFormData, isActive: e.target.value === 'active' })}
                  >
                    <option value="active">Active (Visible on Careers Page)</option>
                    <option value="paused">Paused / Hidden (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Curriculums & Exam Boards</label>
                <input 
                  type="text"
                  placeholder="e.g. CAIE 0580/0607, Edexcel 4MA1, IB DP Physics HL"
                  value={jobFormData.boards}
                  onChange={e => setJobFormData({ ...jobFormData, boards: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Key Requirements & Qualifications *</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="e.g. Minimum 4+ years verified IGCSE/A-Level teaching experience. Examiner credentials preferred..."
                  value={jobFormData.requirements}
                  onChange={e => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                ></textarea>
              </div>

              <div className="career-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsJobModalOpen(false)}
                  className="btn-modal-cancel"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-modal-save"
                  disabled={savingJob}
                >
                  {savingJob ? <RefreshCw size={16} className="spinning-icon" /> : <Sparkles size={16} />}
                  <span>{editingJob ? 'Update Opening' : 'Save Opening'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
