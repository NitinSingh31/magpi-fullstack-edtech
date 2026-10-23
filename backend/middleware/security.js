import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

/**
 * Helmet Security Headers Middleware
 */
export const helmetMiddleware = helmet({
  crossOriginResourcePolicy: false
});

/**
 * CORS Configuration Middleware
 * Dynamically validates and echoes back requesting origin to prevent browser credential rejections
 */
export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. curl, postman, mobile apps)
    if (!origin) return callback(null, true);

    const clientEnv = process.env.CLIENT_URL ? process.env.CLIENT_URL.trim() : '*';

    // If wildcard configured or in development, echo requesting origin back
    if (clientEnv === '*' || !process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    const trustedDomains = [
      'magpiedu.com',
      'vercel.app',
      'localhost',
      '127.0.0.1'
    ];

    const isTrusted = trustedDomains.some(domain => origin.includes(domain));
    const isClientMatch = clientEnv.split(',').some(allowed => origin === allowed.trim());

    if (isTrusted || isClientMatch) {
      return callback(null, true);
    }

    // Default fallback: allow web traffic
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
});

/**
 * API Rate Limiter Middleware
 * Protects public booking and inquiry endpoints from brute-force & spamming
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP address, please try again after 15 minutes.'
  }
});

/**
 * Strict Admin Login Rate Limiter (Brute-Force Protection)
 * Max 5 failed attempts per 15 minutes
 */
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Security Lockout: Too many login attempts. Please wait 15 minutes before trying again.'
  }
});
