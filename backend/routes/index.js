import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';
import careerRoutes from './careerRoutes.js';
import applicationRoutes from './applicationRoutes.js';
import mediaRoutes from './mediaRoutes.js';
import leadershipRoutes from './leadershipRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';

const router = Router();

// Mount Feature Sub-routers
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/careers', careerRoutes);
router.use('/applications', applicationRoutes);
router.use('/media', mediaRoutes);
router.use('/leadership', leadershipRoutes);
router.use('/testimonials', testimonialRoutes);

export default router;
