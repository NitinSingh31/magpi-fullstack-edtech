import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Booking } from '../models/Booking.js';
import { Inquiry } from '../models/Inquiry.js';
import { CareerOpening } from '../models/CareerOpening.js';
import { FacultyApplication } from '../models/FacultyApplication.js';
import { AdminCredential } from '../models/AdminCredential.js';
import { SiteMedia } from '../models/SiteMedia.js';
import { Leadership } from '../models/Leadership.js';
import { Testimonial } from '../models/Testimonial.js';
import { isDatabaseConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const CAREERS_FILE = path.join(DATA_DIR, 'careers.json');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');
const MEDIA_FILE = path.join(DATA_DIR, 'media.json');
const LEADERSHIP_FILE = path.join(DATA_DIR, 'leadership.json');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');

export const DEFAULT_MEDIA_ITEMS = [
  {
    key: 'brand_logo',
    label: 'Website Brand Logo',
    section: 'General & Branding',
    description: 'Header logo, sticky navbar, footer, and admin management portal. Recommended: Transparent PNG (approx. 200x60px).',
    defaultUrl: '/assets/magpi-logo.png'
  },
  {
    key: 'home_hero',
    label: 'Home Page Hero Students Banner',
    section: 'Home Page',
    description: 'Main visual banner on the home page hero section. Recommended: High-res landscape image (approx. 1200x800px).',
    defaultUrl: '/assets/psittacus/hero-students.jpg'
  },
  {
    key: 'stats_student',
    label: 'Global Stats Student Avatar',
    section: 'Home Page',
    description: 'Student avatar displayed alongside global stats (98% Score Improvement). Recommended: Transparent PNG (approx. 400x500px).',
    defaultUrl: '/assets/psittacus/stats-student.png'
  },
  {
    key: 'cta_explore',
    label: 'Dual CTA: Explore Tuitions Card',
    section: 'Home Page',
    description: 'Illustration for "Experience the Magπ Advantage" 1-on-1 tutoring card.',
    defaultUrl: '/assets/psittacus/cta-explore.png'
  },
  {
    key: 'cta_enroll',
    label: 'Dual CTA: Enroll in Courses Card',
    section: 'Home Page',
    description: 'Illustration for "Expand Horizons with Skill-Based Learning" card.',
    defaultUrl: '/assets/psittacus/cta-enroll.png'
  },
  {
    key: 'course_academic',
    label: 'Course Banner: Academic Tutoring',
    section: 'Skill Courses',
    description: 'Banner for IGCSE, IB DP, AS/A-Level & SABIS board tutoring.',
    defaultUrl: '/assets/psittacus/course-academic.jpg'
  },
  {
    key: 'course_coding',
    label: 'Course Banner: Coding & Programming',
    section: 'Skill Courses',
    description: 'Banner for Python, Web Dev, Scratch, AI & Robotics classes.',
    defaultUrl: '/assets/psittacus/course-coding.jpg'
  },
  {
    key: 'course_communication',
    label: 'Course Banner: Communication Skills',
    section: 'Skill Courses',
    description: 'Banner for Public Speaking, Debating, and English Fluency.',
    defaultUrl: '/assets/psittacus/course-communication.jpg'
  },
  {
    key: 'course_languages',
    label: 'Course Banner: Global Languages',
    section: 'Skill Courses',
    description: 'Banner for French, Spanish, German & Mandarin courses.',
    defaultUrl: '/assets/psittacus/course-languages.jpg'
  },
  {
    key: 'course_reasoning',
    label: 'Course Banner: Reasoning & Aptitude',
    section: 'Skill Courses',
    description: 'Banner for Mental Math, Olympiads, and Critical Thinking.',
    defaultUrl: '/assets/psittacus/course-reasoning.jpg'
  }
];

export const DEFAULT_LEADERSHIP = [
  {
    name: "Dr. Elena Vance",
    role: "Head of Sciences & IB DP Advisor",
    credentials: "Ph.D. Oxford, 14+ Years CAIE & IB Examiner",
    subjects: "Physics HL & Chemistry SL/HL",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    order: 1,
    isActive: true
  },
  {
    name: "Prof. Marcus Thorne",
    role: "Lead Faculty – Mathematics & AP Prep",
    credentials: "M.Sc. Imperial College London, 11+ Years",
    subjects: "Pure Math, AP Calculus BC & Math AA",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    order: 2,
    isActive: true
  },
  {
    name: "Dr. Sunita Rao",
    role: "Director of Pedagogy & Olympiad Aptitude",
    credentials: "M.Ed. Harvard GSE, IMO National Coach",
    subjects: "Olympiad Math, Vedic Computation & STEP",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    order: 3,
    isActive: true
  },
  {
    name: "Liam Chen",
    role: "Head of Tech & Future Skills Lab",
    credentials: "B.S. CS UC Berkeley, Former Tech Lead",
    subjects: "Python, AI / Machine Learning & Web Dev",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    order: 4,
    isActive: true
  }
];

export const DEFAULT_TESTIMONIALS = [
  {
    quote: "My child developed real, useful skills in a fun and interactive way. Always something new to learn here!",
    author: "Ayaz Ahmed Khan",
    role: "Parent of Ibrahim Khan",
    rating: 5,
    order: 1,
    isActive: true
  },
  {
    quote: "The structure helped my child think quickly and organize ideas clearly. The sessions built confidence under pressure.",
    author: "Nishat Anjum",
    role: "Parent of Sarah Javed",
    rating: 5,
    order: 2,
    isActive: true
  },
  {
    quote: "Thank you for creating such engaging learning opportunities! The sessions made complex topics easy and enjoyable to understand.",
    author: "Thomas",
    role: "Parent of Davian & Cristabel Thomas",
    rating: 5,
    order: 3,
    isActive: true
  }
];

const DEFAULT_CAREERS = [
  {
    title: "Cambridge IGCSE & A-Level Mathematics Faculty",
    type: "Part-time / Full-time Remote",
    location: "Global (Remote)",
    compensation: "$35 - $65 / hr",
    boards: "CAIE 0580/0607, Edexcel 4MA1, Pure Math P1-P3, Mechanics",
    requirements: "Minimum 4+ years verified IGCSE/A-Level teaching experience. Examiner experience preferred.",
    isActive: true,
    order: 1
  },
  {
    title: "IB Diploma Physics & Chemistry Specialist (HL)",
    type: "Remote Flexible",
    location: "Global (Remote)",
    compensation: "$40 - $70 / hr",
    boards: "IB DP Physics HL & Chemistry HL, IA Mentorship",
    requirements: "Demonstrated track record of guiding students to 6/7 in IB DP. In-depth familiarity with Internal Assessment rubrics.",
    isActive: true,
    order: 2
  },
  {
    title: "Python, AI & Robotics Mentor for Kids",
    type: "Remote Flexible",
    location: "Global (Remote)",
    compensation: "$30 - $55 / hr",
    boards: "Scratch, Python, Pygame, Web Dev, OpenCV",
    requirements: "Passionate CS graduate or developer with exceptional communication skills and enthusiasm for mentoring kids aged 8-16.",
    isActive: true,
    order: 3
  },
  {
    title: "Native French / Spanish Language Educator",
    type: "Remote Flexible",
    location: "Global (Remote)",
    compensation: "$30 - $50 / hr",
    boards: "CEFR A1-B2, DELF Prim/Junior, DELE, IB French/Spanish B",
    requirements: "Native fluency in French or Spanish. Prior experience preparing students for official CEFR or board language exams.",
    isActive: true,
    order: 4
  },
  {
    title: "Public Speaking, MUN & Debate Coach",
    type: "Remote Flexible",
    location: "Global (Remote)",
    compensation: "$35 - $60 / hr",
    boards: "WSDC Parliamentary Debate, Harvard MUN, Oratory",
    requirements: "Former university competitive debater or MUN Best Delegate winner with coaching credentials for youth.",
    isActive: true,
    order: 5
  }
];

// Ensure local fallback directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const readLocal = (file) => {
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
    return [];
  }
};

const writeLocal = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${file}:`, err.message);
  }
};

export const storageService = {
  // --- Bookings ---
  async createBooking(payload) {
    if (isDatabaseConnected()) {
      const doc = new Booking(payload);
      return await doc.save();
    } else {
      const list = readLocal(BOOKINGS_FILE);
      const newEntry = {
        _id: 'local_' + Date.now(),
        ...payload,
        createdAt: new Date().toISOString()
      };
      list.unshift(newEntry);
      writeLocal(BOOKINGS_FILE, list);
      return newEntry;
    }
  },

  async getBookings() {
    if (isDatabaseConnected()) {
      return await Booking.find().sort({ createdAt: -1 }).lean();
    } else {
      return readLocal(BOOKINGS_FILE);
    }
  },

  async updateBooking(id, updateData) {
    if (isDatabaseConnected() && !id.startsWith('local_')) {
      return await Booking.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).lean();
    } else {
      const list = readLocal(BOOKINGS_FILE);
      const idx = list.findIndex(b => b._id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updateData };
        writeLocal(BOOKINGS_FILE, list);
        return list[idx];
      }
      return null;
    }
  },

  // --- Inquiries ---
  async createInquiry(payload) {
    if (isDatabaseConnected()) {
      const doc = new Inquiry(payload);
      return await doc.save();
    } else {
      const list = readLocal(INQUIRIES_FILE);
      const newEntry = {
        _id: 'inq_' + Date.now(),
        ...payload,
        createdAt: new Date().toISOString()
      };
      list.unshift(newEntry);
      writeLocal(INQUIRIES_FILE, list);
      return newEntry;
    }
  },

  async getInquiries() {
    if (isDatabaseConnected()) {
      return await Inquiry.find().sort({ createdAt: -1 }).lean();
    } else {
      return readLocal(INQUIRIES_FILE);
    }
  },

  // --- Career Openings ---
  async getCareerOpenings({ activeOnly = false } = {}) {
    if (isDatabaseConnected()) {
      const count = await CareerOpening.countDocuments();
      if (count === 0) {
        // Auto-seed default careers
        await CareerOpening.insertMany(DEFAULT_CAREERS);
      }
      const query = activeOnly ? { isActive: true } : {};
      return await CareerOpening.find(query).sort({ order: 1, createdAt: -1 }).lean();
    } else {
      let list = readLocal(CAREERS_FILE);
      if (!list || list.length === 0) {
        list = DEFAULT_CAREERS.map((c, i) => ({
          _id: 'job_' + (Date.now() + i),
          ...c,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
        writeLocal(CAREERS_FILE, list);
      }
      if (activeOnly) {
        return list.filter(item => item.isActive !== false);
      }
      return list;
    }
  },

  async createCareerOpening(payload) {
    if (isDatabaseConnected()) {
      const doc = new CareerOpening({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return await doc.save();
    } else {
      const list = readLocal(CAREERS_FILE);
      const newEntry = {
        _id: 'job_' + Date.now(),
        ...payload,
        isActive: payload.isActive !== undefined ? payload.isActive : true,
        order: payload.order !== undefined ? payload.order : list.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      list.unshift(newEntry);
      writeLocal(CAREERS_FILE, list);
      return newEntry;
    }
  },

  async updateCareerOpening(id, updateData) {
    if (isDatabaseConnected() && !id.startsWith('job_')) {
      return await CareerOpening.findByIdAndUpdate(
        id,
        { $set: { ...updateData, updatedAt: new Date() } },
        { new: true }
      ).lean();
    } else {
      const list = readLocal(CAREERS_FILE);
      const idx = list.findIndex(c => c._id === id);
      if (idx !== -1) {
        list[idx] = { 
          ...list[idx], 
          ...updateData,
          updatedAt: new Date().toISOString() 
        };
        writeLocal(CAREERS_FILE, list);
        return list[idx];
      }
      return null;
    }
  },

  async deleteCareerOpening(id) {
    if (isDatabaseConnected() && !id.startsWith('job_')) {
      const result = await CareerOpening.findByIdAndDelete(id);
      return Boolean(result);
    } else {
      let list = readLocal(CAREERS_FILE);
      const prevLen = list.length;
      list = list.filter(c => c._id !== id);
      writeLocal(CAREERS_FILE, list);
      return list.length < prevLen;
    }
  },

  // --- Faculty Applications ---
  async createFacultyApplication(payload) {
    if (isDatabaseConnected()) {
      const doc = new FacultyApplication(payload);
      return await doc.save();
    } else {
      const list = readLocal(APPLICATIONS_FILE);
      const newEntry = {
        _id: 'app_' + Date.now(),
        ...payload,
        status: payload.status || 'New',
        createdAt: new Date().toISOString()
      };
      list.unshift(newEntry);
      writeLocal(APPLICATIONS_FILE, list);
      return newEntry;
    }
  },

  async getFacultyApplications() {
    if (isDatabaseConnected()) {
      return await FacultyApplication.find().sort({ createdAt: -1 }).lean();
    } else {
      return readLocal(APPLICATIONS_FILE);
    }
  },

  async updateFacultyApplicationStatus(id, status) {
    if (isDatabaseConnected() && !id.startsWith('app_')) {
      return await FacultyApplication.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true }
      ).lean();
    } else {
      const list = readLocal(APPLICATIONS_FILE);
      const idx = list.findIndex(a => a._id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], status };
        writeLocal(APPLICATIONS_FILE, list);
        return list[idx];
      }
      return null;
    }
  },

  async getAdminCredentials() {
    const fallbackPassword = process.env.ADMIN_PASSWORD || 'magpi2026';
    const defaultUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();

    // 1. Check MongoDB Atlas
    if (isDatabaseConnected()) {
      try {
        const doc = await AdminCredential.findOne({ username: 'admin' }).lean();
        if (doc && doc.password) {
          return { username: doc.username, password: doc.password };
        }
      } catch (err) {
        console.warn('[Storage] Could not fetch admin credentials from MongoDB:', err.message);
      }
    }

    // 2. Check local JSON fallback
    try {
      if (fs.existsSync(ADMIN_FILE)) {
        const data = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf-8'));
        if (data && data.password) {
          return { username: data.username || defaultUser, password: data.password };
        }
      }
    } catch (err) {
      console.warn('[Storage] Could not read admin.json:', err.message);
    }

    // 3. Fallback to environment variables
    return { username: defaultUser, password: fallbackPassword };
  },

  async updateAdminPassword(newPassword) {
    const defaultUser = 'admin';

    // 1. Save to MongoDB Atlas if connected
    if (isDatabaseConnected()) {
      try {
        await AdminCredential.findOneAndUpdate(
          { username: defaultUser },
          { password: newPassword, updatedAt: new Date() },
          { upsert: true, new: true }
        );
      } catch (err) {
        console.warn('[Storage] Failed to update admin in MongoDB:', err.message);
      }
    }

    // 2. Save to local fallback JSON
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(
        ADMIN_FILE,
        JSON.stringify({ username: defaultUser, password: newPassword, updatedAt: new Date().toISOString() }, null, 2),
        'utf-8'
      );
    } catch (err) {
      console.warn('[Storage] Failed to write admin.json:', err.message);
    }

    return true;
  },

  /**
   * Retrieve all website media slots merged with active database / JSON customizations
   */
  async getSiteMedia() {
    let savedMediaMap = {};

    // 1. Try fetching from MongoDB Atlas
    if (isDatabaseConnected()) {
      try {
        const docs = await SiteMedia.find().lean();
        docs.forEach(doc => {
          if (doc.key) {
            savedMediaMap[doc.key] = doc;
          }
        });
      } catch (err) {
        console.warn('[Storage] Could not fetch site media from MongoDB:', err.message);
      }
    }

    // 2. Try merging from local JSON fallback if MongoDB not connected or empty
    if (Object.keys(savedMediaMap).length === 0) {
      try {
        if (fs.existsSync(MEDIA_FILE)) {
          const fileData = JSON.parse(fs.readFileSync(MEDIA_FILE, 'utf-8'));
          if (Array.isArray(fileData)) {
            fileData.forEach(item => {
              if (item.key) savedMediaMap[item.key] = item;
            });
          } else if (typeof fileData === 'object' && fileData !== null) {
            savedMediaMap = fileData;
          }
        }
      } catch (err) {
        console.warn('[Storage] Could not read media.json:', err.message);
      }
    }

    // 3. Merge with DEFAULT_MEDIA_ITEMS so all slots are guaranteed to exist
    const items = DEFAULT_MEDIA_ITEMS.map(def => {
      const saved = savedMediaMap[def.key] || {};
      const customUrl = (saved.imageUrl && saved.imageUrl.trim()) ? saved.imageUrl.trim() : '';
      return {
        key: def.key,
        label: saved.label || def.label,
        section: saved.section || def.section,
        description: saved.description || def.description,
        defaultUrl: def.defaultUrl,
        imageUrl: customUrl,
        activeUrl: customUrl || def.defaultUrl,
        isCustom: Boolean(customUrl),
        updatedAt: saved.updatedAt || null,
        updatedBy: saved.updatedBy || 'admin'
      };
    });

    const map = {};
    items.forEach(item => {
      map[item.key] = item.activeUrl;
    });

    return { items, map };
  },

  /**
   * Update or upload custom image for a media slot
   */
  async updateSiteMediaItem(key, imageUrl, updatedBy = 'admin') {
    const cleanKey = String(key).trim().toLowerCase();
    const cleanUrl = String(imageUrl || '').trim();

    const def = DEFAULT_MEDIA_ITEMS.find(d => d.key === cleanKey) || {
      key: cleanKey,
      label: cleanKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      section: 'Custom',
      description: '',
      defaultUrl: cleanUrl
    };

    const updatePayload = {
      key: cleanKey,
      label: def.label,
      section: def.section,
      description: def.description,
      defaultUrl: def.defaultUrl,
      imageUrl: cleanUrl,
      updatedAt: new Date(),
      updatedBy: updatedBy || 'admin'
    };

    // 1. Update in MongoDB Atlas
    if (isDatabaseConnected()) {
      try {
        await SiteMedia.findOneAndUpdate(
          { key: cleanKey },
          updatePayload,
          { upsert: true, new: true }
        );
      } catch (err) {
        console.warn('[Storage] Failed to update media in MongoDB:', err.message);
      }
    }

    // 2. Update in local media.json fallback
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      let existing = {};
      if (fs.existsSync(MEDIA_FILE)) {
        try {
          existing = JSON.parse(fs.readFileSync(MEDIA_FILE, 'utf-8'));
          if (Array.isArray(existing)) {
            const temp = {};
            existing.forEach(i => { if (i.key) temp[i.key] = i; });
            existing = temp;
          }
        } catch (_) {
          existing = {};
        }
      }
      existing[cleanKey] = updatePayload;
      fs.writeFileSync(MEDIA_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[Storage] Failed to write media.json:', err.message);
    }

    return {
      ...updatePayload,
      activeUrl: cleanUrl || def.defaultUrl,
      isCustom: Boolean(cleanUrl)
    };
  },

  /**
   * Reset a media slot back to its default asset
   */
  async resetSiteMediaItem(key, updatedBy = 'admin') {
    return this.updateSiteMediaItem(key, '', updatedBy);
  },

  // --- Academic Leadership ---
  async getLeadership({ activeOnly = false } = {}) {
    if (isDatabaseConnected()) {
      const count = await Leadership.countDocuments();
      if (count === 0) {
        // Auto-seed default leadership
        await Leadership.insertMany(DEFAULT_LEADERSHIP);
      }
      const query = activeOnly ? { isActive: true } : {};
      return await Leadership.find(query).sort({ order: 1, createdAt: 1 }).lean();
    } else {
      let list = readLocal(LEADERSHIP_FILE);
      if (!list || list.length === 0) {
        list = DEFAULT_LEADERSHIP.map((m, i) => ({
          _id: 'ldr_' + (Date.now() + i),
          ...m,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
        writeLocal(LEADERSHIP_FILE, list);
      }
      if (activeOnly) {
        return list.filter(item => item.isActive !== false);
      }
      return list.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  },

  async createLeadership(payload) {
    if (isDatabaseConnected()) {
      const doc = new Leadership({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return await doc.save();
    } else {
      const list = readLocal(LEADERSHIP_FILE);
      const newEntry = {
        _id: 'ldr_' + Date.now(),
        ...payload,
        isActive: payload.isActive !== undefined ? Boolean(payload.isActive) : true,
        order: payload.order !== undefined ? Number(payload.order) : list.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      list.push(newEntry);
      writeLocal(LEADERSHIP_FILE, list);
      return newEntry;
    }
  },

  async updateLeadership(id, updateData) {
    if (isDatabaseConnected() && !id.startsWith('ldr_')) {
      return await Leadership.findByIdAndUpdate(
        id,
        { $set: { ...updateData, updatedAt: new Date() } },
        { new: true }
      ).lean();
    } else {
      const list = readLocal(LEADERSHIP_FILE);
      const idx = list.findIndex(m => m._id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        writeLocal(LEADERSHIP_FILE, list);
        return list[idx];
      }
      return null;
    }
  },

  async deleteLeadership(id) {
    if (isDatabaseConnected() && !id.startsWith('ldr_')) {
      return await Leadership.findByIdAndDelete(id).lean();
    } else {
      let list = readLocal(LEADERSHIP_FILE);
      const exists = list.some(m => m._id === id);
      if (exists) {
        list = list.filter(m => m._id !== id);
        writeLocal(LEADERSHIP_FILE, list);
        return { _id: id };
      }
      return null;
    }
  },

  // --- Testimonials / Reviews ---
  async getTestimonials({ activeOnly = false } = {}) {
    if (isDatabaseConnected()) {
      const count = await Testimonial.countDocuments();
      if (count === 0) {
        // Auto-seed default testimonials
        await Testimonial.insertMany(DEFAULT_TESTIMONIALS);
      }
      const query = activeOnly ? { isActive: true } : {};
      return await Testimonial.find(query).sort({ order: 1, createdAt: 1 }).lean();
    } else {
      let list = readLocal(TESTIMONIALS_FILE);
      if (!list || list.length === 0) {
        list = DEFAULT_TESTIMONIALS.map((t, i) => ({
          _id: 'rev_' + (Date.now() + i),
          ...t,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }));
        writeLocal(TESTIMONIALS_FILE, list);
      }
      if (activeOnly) {
        return list.filter(item => item.isActive !== false);
      }
      return list.sort((a, b) => (a.order || 0) - (b.order || 0));
    }
  },

  async createTestimonial(payload) {
    if (isDatabaseConnected()) {
      const doc = new Testimonial({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return await doc.save();
    } else {
      const list = readLocal(TESTIMONIALS_FILE);
      const newEntry = {
        _id: 'rev_' + Date.now(),
        ...payload,
        rating: payload.rating !== undefined ? Number(payload.rating) : 5,
        isActive: payload.isActive !== undefined ? Boolean(payload.isActive) : true,
        order: payload.order !== undefined ? Number(payload.order) : list.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      list.push(newEntry);
      writeLocal(TESTIMONIALS_FILE, list);
      return newEntry;
    }
  },

  async updateTestimonial(id, updateData) {
    if (isDatabaseConnected() && !id.startsWith('rev_')) {
      return await Testimonial.findByIdAndUpdate(
        id,
        { $set: { ...updateData, updatedAt: new Date() } },
        { new: true }
      ).lean();
    } else {
      const list = readLocal(TESTIMONIALS_FILE);
      const idx = list.findIndex(t => t._id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        writeLocal(TESTIMONIALS_FILE, list);
        return list[idx];
      }
      return null;
    }
  },

  async deleteTestimonial(id) {
    if (isDatabaseConnected() && !id.startsWith('rev_')) {
      return await Testimonial.findByIdAndDelete(id).lean();
    } else {
      let list = readLocal(TESTIMONIALS_FILE);
      const exists = list.some(t => t._id === id);
      if (exists) {
        list = list.filter(t => t._id !== id);
        writeLocal(TESTIMONIALS_FILE, list);
        return { _id: id };
      }
      return null;
    }
  }
};


