import { Router } from 'express';
import { 
  submitApplication, 
  getApplications, 
  updateApplicationStatus 
} from '../controllers/applicationController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route to submit an educator application
router.post('/', submitApplication);

// Protected admin routes to view applicants and update status
router.get('/', requireAdminAuth, getApplications);
router.patch('/:id/status', requireAdminAuth, updateApplicationStatus);

export default router;
