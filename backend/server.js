import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5001;

// Initialize Database and Start Server
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 [Server] Magπ Backend running on http://localhost:${PORT}`);
      console.log(`🩺 [Server] Health Check: http://localhost:${PORT}/api/health`);
    });

    // Graceful Shutdown
    const shutdown = (signal) => {
      console.log(`\n🛑 [Server] Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('🏁 [Server] HTTP server closed cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('❌ [Server] Failed to initialize backend server:', error);
    process.exit(1);
  }
};

// Trap Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();
