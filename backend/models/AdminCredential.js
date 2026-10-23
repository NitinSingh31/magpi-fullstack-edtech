import mongoose from 'mongoose';

const adminCredentialSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: 'admin'
  },
  password: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const AdminCredential = mongoose.models.AdminCredential || mongoose.model('AdminCredential', adminCredentialSchema);
