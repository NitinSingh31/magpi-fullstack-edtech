import { Router } from 'express';
import { adminLogin, verifySession } from '../controllers/authController.js';
import { adminLoginLimiter } from '../middleware/security.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Login endpoint protected by strict brute-force rate limiter
router.post('/login', adminLoginLimiter, adminLogin);

// Verify active token
router.get('/verify', requireAdminAuth, verifySession);

export default router;
