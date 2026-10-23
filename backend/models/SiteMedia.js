import mongoose from 'mongoose';

const siteMediaSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  label: {
    type: String,
    required: true
  },
  section: {
    type: String,
    default: 'General'
  },
  description: {
    type: String,
    default: ''
  },
  defaultUrl: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String,
    default: 'admin'
  }
});

export const SiteMedia = mongoose.models.SiteMedia || mongoose.model('SiteMedia', siteMediaSchema);
