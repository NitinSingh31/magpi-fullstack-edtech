import { isDatabaseConnected } from '../config/db.js';

export const getHealthStatus = (req, res) => {
  res.json({
    status: 'online',
    appName: 'Magπ EdTech Platform API',
    version: '1.0.0',
    database: isDatabaseConnected() ? 'MongoDB Atlas (Connected)' : 'Local Persistent Storage (Fallback)',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};
