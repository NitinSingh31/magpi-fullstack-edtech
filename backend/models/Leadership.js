import mongoose from 'mongoose';

const leadershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Leader full name is required'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Role or designation is required'],
    trim: true
  },
  credentials: {
    type: String,
    default: '',
    trim: true
  },
  subjects: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
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

leadershipSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  if (typeof next === 'function') next();
});

export const Leadership = mongoose.models.Leadership || mongoose.model('Leadership', leadershipSchema);
