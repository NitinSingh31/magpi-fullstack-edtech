import { Router } from 'express';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '../controllers/testimonialController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route to view active testimonials
router.get('/', getTestimonials);

// Protected admin routes to manage testimonials
router.post('/', requireAdminAuth, createTestimonial);
router.patch('/:id', requireAdminAuth, updateTestimonial);
router.delete('/:id', requireAdminAuth, deleteTestimonial);

export default router;
