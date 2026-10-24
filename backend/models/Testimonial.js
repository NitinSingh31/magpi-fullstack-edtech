import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role or parent description is required'],
    trim: true
  },
  quote: {
    type: String,
    required: [true, 'Review quote text is required'],
    trim: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
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

testimonialSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (typeof next === 'function') next();
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
