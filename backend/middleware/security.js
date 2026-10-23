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
 */
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL] : ['*'];

export const corsMiddleware = cors({
  origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
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
