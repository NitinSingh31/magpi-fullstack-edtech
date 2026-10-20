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
  Search
} from 'lucide-react';
import './AdminPanel.css';
import api from '../services/api.js';

export default function AdminPanel({ isOpen, onClose }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState({ database: 'Checking...', status: 'loading' });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getBookings();
      if (data.success) {
        setBookings(data.data || []);
      }

      const healthData = await api.checkHealth();
      setDbStatus(healthData);
    } catch (err) {
      console.warn('Backend not reachable:', err);
      setDbStatus({ database: 'Backend Offline', status: 'offline' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateBookingStatus(id, { status: newStatus });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (!isOpen) return null;

  const filteredBookings = bookings.filter(b => 
    b.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.curriculum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal-dialog" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-left">
            <div className="admin-title-row">
              <img src="/images/logo.png" alt="Magπ" className="admin-header-logo" />
              <h2>Leads & Trial Bookings</h2>
            </div>
            <div className="db-badge">
              <Database size={14} />
              <span>Database: <strong>{dbStatus.database || 'Local Store'}</strong></span>
              <span className={`db-status-dot ${dbStatus.status === 'online' ? 'online' : 'offline'}`}></span>
            </div>
          </div>

          <div className="admin-header-actions">
            <button onClick={fetchBookings} className="btn-refresh" title="Refresh Leads">
              <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            </button>
            <button onClick={onClose} className="btn-close-admin" aria-label="Close Admin Panel">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar & Stats */}
        <div className="admin-toolbar">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by parent name, subject, curriculum, or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="admin-count">
            Total Leads: <strong>{filteredBookings.length}</strong>
          </div>
        </div>

        {/* Bookings Table / List */}
        <div className="admin-body">
          {loading ? (
            <div className="admin-loading">
              <RefreshCw size={24} className="spinning" />
              <p>Fetching bookings from database...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="admin-empty-state">
              <p>No trial bookings found yet.</p>
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
                      <span className="chip-label">Time Slot</span>
                      <span>{b.preferredTime}</span>
                    </div>

                    <div className="detail-chip">
                      <span className="chip-label">Contact</span>
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
          )}
        </div>

        {/* Footer */}
        <div className="admin-footer">
          <small>
            💡 Connected to <strong>MongoDB Atlas M0 / Local Store</strong>. Database is 100% free with no credit card required.
          </small>
        </div>
      </div>
    </div>
  );
}
