/**
 * Magπ API Client Service
 * Centralized HTTP service for backend communication with resilience fallbacks.
 */

const isDev = Boolean(
  typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
);

const RAW_API_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = RAW_API_URL 
  ? RAW_API_URL.replace(/\/$/, '') 
  : (isDev ? 'http://localhost:5001/api' : '/api');

/**
 * Standard fetch wrapper with JSON parsing and error handling
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('magpi_admin_token') : null;
  const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...options.headers
    },
    ...options
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      // If 401 Unauthorized, automatically clear stale token
      if (res.status === 401 && typeof window !== 'undefined') {
        sessionStorage.removeItem('magpi_admin_token');
        sessionStorage.removeItem('magpi_admin_auth');
      }
      const errorMsg = data.error || `HTTP ${res.status}: ${res.statusText}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.warn(`[API Client] Request failed: ${endpoint}`, error.message);
    throw error;
  }
}

export const api = {
  /**
   * Health Check & DB Status
   */
  async checkHealth() {
    return request('/health');
  },

  /**
   * Admin Authentication (JWT Login)
   */
  async loginAdmin(password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password })
    });
  },

  /**
   * Verify Active Admin Session Token
   */
  async verifyAdminSession() {
    return request('/auth/verify');
  },

  /**
   * Submit a new Trial Booking
   */
  async createBooking(bookingData) {
    return request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  },

  /**
   * Retrieve all bookings (Admin Panel)
   */
  async getBookings() {
    return request('/bookings');
  },

  /**
   * Update booking status or notes (Admin Panel)
   */
  async updateBookingStatus(id, updateData) {
    return request(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    });
  },

  /**
   * Submit general contact inquiry or newsletter subscription
   */
  async createInquiry(inquiryData) {
    return request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData)
    });
  },

  /**
   * Retrieve all inquiries (Admin)
   */
  async getInquiries() {
    return request('/inquiries');
  },

  /**
   * Retrieve career openings (optional { activeOnly: true })
   */
  async getCareerOpenings(params = {}) {
    const query = params.activeOnly ? '?activeOnly=true' : '';
    return request(`/careers${query}`);
  },

  /**
   * Create a new career opening (Admin)
   */
  async createCareerOpening(openingData) {
    return request('/careers', {
      method: 'POST',
      body: JSON.stringify(openingData)
    });
  },

  /**
   * Update an existing career opening (Admin)
   */
  async updateCareerOpening(id, updateData) {
    return request(`/careers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    });
  },

  /**
   * Delete a career opening (Admin)
   */
  async deleteCareerOpening(id) {
    return request(`/careers/${id}`, {
      method: 'DELETE'
    });
  },

  /**
   * Submit Faculty Application with Resume (Careers Page)
   */
  async submitFacultyApplication(applicationData) {
    return request('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData)
    });
  },

  /**
   * Retrieve all Faculty Applications (Admin)
   */
  async getFacultyApplications() {
    return request('/applications');
  },

  /**
   * Update Faculty Application Status (Admin)
   */
  async updateFacultyApplicationStatus(id, status) {
    return request(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }
};

export default api;
