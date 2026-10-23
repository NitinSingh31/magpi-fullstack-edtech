import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';
import careerRoutes from './careerRoutes.js';
import applicationRoutes from './applicationRoutes.js';

const router = Router();

// Mount Feature Sub-routers
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/careers', careerRoutes);
router.use('/applications', applicationRoutes);

export default router;
