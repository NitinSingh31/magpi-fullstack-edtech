import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Booking } from './models/Booking.js';
import { Inquiry } from './models/Inquiry.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(cors());
app.use(express.json());

// Local File Store Fallback (when MongoDB Atlas URI is not yet configured)
const LOCAL_DATA_DIR = path.join(__dirname, 'data');
const LOCAL_BOOKINGS_FILE = path.join(LOCAL_DATA_DIR, 'bookings.json');
const LOCAL_INQUIRIES_FILE = path.join(LOCAL_DATA_DIR, 'inquiries.json');

if (!fs.existsSync(LOCAL_DATA_DIR)) {
  fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
}

const readLocalFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const writeLocalFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write local backup file:', err.message);
  }
};

// Database Connection State
let isMongoConnected = false;

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      isMongoConnected = true;
      console.log('✅ Connected to MongoDB Atlas successfully!');
    })
    .catch((err) => {
      console.warn('⚠️ MongoDB connection warning:', err.message);
      console.log('📁 Using local persistent storage fallback until MongoDB Atlas is connected.');
    });
} else {
  console.log('ℹ️ No MONGODB_URI provided in .env. Operating in local storage mode.');
  console.log('👉 To connect MongoDB Atlas, paste your connection string in .env');
}

/* ==========================================================================
   API Endpoints
   ========================================================================== */

// 1. Health check & DB Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Magπ EdTech API',
    database: isMongoConnected ? 'MongoDB Atlas' : 'Local Persistent Storage',
    timestamp: new Date().toISOString()
  });
});

// 2. Create a Free Trial Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { parentName, email, phone, curriculum, grade, subject, preferredTime, whatsappUpdates } = req.body;

    if (!parentName || !email || !phone || !subject) {
      return res.status(400).json({ error: 'Please provide parent name, email, phone, and subject' });
    }

    const bookingPayload = {
      parentName,
      email,
      phone,
      curriculum: curriculum || 'Cambridge IGCSE',
      grade: grade || 'Grade 9 - 10',
      subject,
      preferredTime: preferredTime || 'Evening (5:00 PM - 8:00 PM)',
      whatsappUpdates: whatsappUpdates !== undefined ? whatsappUpdates : true,
      status: 'Pending',
      createdAt: new Date()
    };

    if (isMongoConnected) {
      const newBooking = new Booking(bookingPayload);
      const saved = await newBooking.save();
      return res.status(201).json({ success: true, source: 'mongodb', data: saved });
    } else {
      // Local storage fallback
      const currentBookings = readLocalFile(LOCAL_BOOKINGS_FILE);
      const newEntry = {
        _id: 'local_' + Date.now(),
        ...bookingPayload
      };
      currentBookings.unshift(newEntry);
      writeLocalFile(LOCAL_BOOKINGS_FILE, currentBookings);
      return res.status(201).json({ success: true, source: 'local_storage', data: newEntry });
    }
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Internal server error while saving booking' });
  }
});

// 3. Get All Bookings (Admin)
app.get('/api/bookings', async (req, res) => {
  try {
    if (isMongoConnected) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, data: bookings });
    } else {
      const bookings = readLocalFile(LOCAL_BOOKINGS_FILE);
      return res.json({ success: true, count: bookings.length, data: bookings });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});

// 4. Update Booking Status (e.g. Pending -> Contacted / Confirmed)
app.patch('/api/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (isMongoConnected && !id.startsWith('local_')) {
      const updated = await Booking.findByIdAndUpdate(
        id,
        { $set: { ...(status && { status }), ...(notes !== undefined && { notes }) } },
        { new: true }
      );
      return res.json({ success: true, data: updated });
    } else {
      const bookings = readLocalFile(LOCAL_BOOKINGS_FILE);
      const idx = bookings.findIndex(b => b._id === id);
      if (idx !== -1) {
        if (status) bookings[idx].status = status;
        if (notes !== undefined) bookings[idx].notes = notes;
        writeLocalFile(LOCAL_BOOKINGS_FILE, bookings);
        return res.json({ success: true, data: bookings[idx] });
      }
      return res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// 5. Save Newsletter / Contact Inquiries
app.post('/api/inquiries', async (req, res) => {
  try {
    const { email, type = 'newsletter', message = '' } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const payload = { email, type, message, createdAt: new Date() };

    if (isMongoConnected) {
      const item = new Inquiry(payload);
      const saved = await item.save();
      return res.status(201).json({ success: true, data: saved });
    } else {
      const inquiries = readLocalFile(LOCAL_INQUIRIES_FILE);
      const newEntry = { _id: 'inq_' + Date.now(), ...payload };
      inquiries.unshift(newEntry);
      writeLocalFile(LOCAL_INQUIRIES_FILE, inquiries);
      return res.status(201).json({ success: true, data: newEntry });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to save inquiry' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Magπ Backend server running on http://localhost:${PORT}`);
});
