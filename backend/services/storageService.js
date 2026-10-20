import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Booking } from '../models/Booking.js';
import { Inquiry } from '../models/Inquiry.js';
import { isDatabaseConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

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
  }
};
