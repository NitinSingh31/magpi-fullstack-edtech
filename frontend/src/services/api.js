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
  : (isDev ? 'http://localhost:5001/api' : 'https://magpi-fullstack-edtech.onrender.com/api');

/**
 * Standard fetch wrapper with JSON parsing and error handling
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = typeof window !== 'undefined' 
    ? (sessionStorage.getItem('magpi_admin_token') || localStorage.getItem('magpi_admin_token'))
    : null;
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
        localStorage.removeItem('magpi_admin_token');
        localStorage.removeItem('magpi_admin_auth');
      }
      const errorMsg = data.error || `HTTP ${res.status}: ${res.statusText}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.warn(`[API Client] Request failed: ${endpoint}`, error.message);
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to reach the backend server (Render may be spinning up or deploying). Please retry in 30 seconds.');
    }
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
  async loginAdmin(credentials) {
    const payload = typeof credentials === 'string'
      ? { password: credentials }
      : credentials;

    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  /**
   * Verify Active Admin Session Token
   */
  async verifyAdminSession() {
    return request('/auth/verify');
  },

  /**
   * Change Admin Security Password
   */
  async changePassword(currentPassword, newPassword) {
    return request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    });
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
  },

  /**
   * Retrieve all website media slots and active images (Public / Cached)
   */
  async getSiteMedia() {
    return request('/media');
  },

  /**
   * Update / upload an image for a specific media slot (Admin)
   */
  async updateSiteMedia(key, imageUrl) {
    return request(`/media/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify({ imageUrl })
    });
  },

  /**
   * Reset a media slot back to its default system asset (Admin)
   */
  async resetSiteMedia(key) {
    return request(`/media/${encodeURIComponent(key)}/reset`, {
      method: 'POST'
    });
  },

  /**
   * Retrieve academic leadership members (optional { activeOnly: true })
   */
  async getLeadership(params = {}) {
    const query = params.activeOnly ? '?activeOnly=true' : '';
    return request(`/leadership${query}`);
  },

  /**
   * Create a new leadership member (Admin)
   */
  async createLeadership(leaderData) {
    return request('/leadership', {
      method: 'POST',
      body: JSON.stringify(leaderData)
    });
  },

  /**
   * Update an existing leadership member (Admin)
   */
  async updateLeadership(id, updateData) {
    return request(`/leadership/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    });
  },

  /**
   * Delete a leadership member (Admin)
   */
  async deleteLeadership(id) {
    return request(`/leadership/${id}`, {
      method: 'DELETE'
    });
  }
};

export default api;
