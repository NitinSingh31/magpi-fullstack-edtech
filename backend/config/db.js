import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('ℹ️ [Database] No MONGODB_URI found. Running in local JSON storage mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log(`✅ [Database] MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [Database] Connection Failed: ${error.message}`);
    console.log('📁 [Database] Fallback to local persistent storage mode.');
    isConnected = false;
    return false;
  }
};

export const isDatabaseConnected = () => isConnected;
