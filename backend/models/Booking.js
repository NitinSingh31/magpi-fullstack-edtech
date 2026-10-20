import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: [true, 'Parent name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  curriculum: {
    type: String,
    required: true,
    default: 'Cambridge IGCSE'
  },
  grade: {
    type: String,
    required: true,
    default: 'Grade 9 - 10'
  },
  subject: {
    type: String,
    required: true,
    default: 'Mathematics'
  },
  preferredTime: {
    type: String,
    default: 'Evening (5:00 PM - 8:00 PM)'
  },
  whatsappUpdates: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Confirmed', 'Completed'],
    default: 'Pending'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Avoid recompiling model if already defined
export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
