import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Booking } from '../models/Booking.js';
import { Inquiry } from '../models/Inquiry.js';
import { CareerOpening } from '../models/CareerOpening.js';
import { isDatabaseConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const CAREERS_FILE = path.join(DATA_DIR, 'careers.json');

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
  }
};
