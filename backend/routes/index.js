import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import inquiryRoutes from './inquiryRoutes.js';

const router = Router();

// Mount Feature Sub-routers
router.use('/health', healthRoutes);
router.use('/bookings', bookingRoutes);
router.use('/inquiries', inquiryRoutes);

export default router;
