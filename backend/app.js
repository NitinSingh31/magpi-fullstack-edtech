import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { helmetMiddleware, corsMiddleware, apiRateLimiter } from './middleware/security.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../frontend/dist');

const app = express();

// Security Middleware
app.use(helmetMiddleware);
app.use(corsMiddleware);

// Body Parsing Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Apply Rate Limiter to all /api routes
app.use('/api', apiRateLimiter);

// Mount Application Routes
app.use('/api', apiRoutes);

// If frontend dist exists (unified single-service deployment), serve SPA
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Standalone API deployment fallback
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Magπ EdTech API',
      docs: '/api/health',
      databaseStatus: '/api/health',
      status: 'active'
    });
  });
}

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
