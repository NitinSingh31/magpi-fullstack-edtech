import express from 'express';
import { helmetMiddleware, corsMiddleware, apiRateLimiter } from './middleware/security.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

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

// Root Fallback Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Magπ EdTech API',
    docs: '/api/health',
    status: 'active'
  });
});

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
