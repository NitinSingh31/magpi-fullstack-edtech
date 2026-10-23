import mongoose from 'mongoose';

const facultyApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Candidate name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Candidate email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  role: {
    type: String,
    default: 'General Faculty Application'
  },
  experience: {
    type: String,
    default: '3 - 5 Years'
  },
  qualification: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  resume: {
    fileName: { type: String, default: '' },
    fileSize: { type: Number, default: 0 },
    fileType: { type: String, default: '' },
    fileData: { type: String, default: '' }, // Base64 data URL for instant 1-click download anywhere
    fileUrl: { type: String, default: '' }
  },
  status: {
    type: String,
    enum: ['New', 'Reviewed', 'Interview Scheduled', 'Rejected', 'Hired'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const FacultyApplication = mongoose.models.FacultyApplication || mongoose.model('FacultyApplication', facultyApplicationSchema);
