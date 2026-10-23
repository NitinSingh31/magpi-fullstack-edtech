import mongoose from 'mongoose';

const careerOpeningSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  type: {
    type: String,
    required: true,
    default: 'Remote Flexible'
  },
  location: {
    type: String,
    default: 'Global (Remote)'
  },
  compensation: {
    type: String,
    default: '$35 - $65 / hr'
  },
  boards: {
    type: String,
    default: ''
  },
  requirements: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

careerOpeningSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (typeof next === 'function') next();
});

export const CareerOpening = mongoose.models.CareerOpening || mongoose.model('CareerOpening', careerOpeningSchema);
