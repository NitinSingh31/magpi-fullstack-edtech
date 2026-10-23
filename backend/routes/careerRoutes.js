import { Router } from 'express';
import { 
  getCareerOpenings, 
  createCareerOpening, 
  updateCareerOpening, 
  deleteCareerOpening 
} from '../controllers/careerController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route to view active jobs
router.get('/', getCareerOpenings);

// Protected admin routes to modify jobs
router.post('/', requireAdminAuth, createCareerOpening);
router.patch('/:id', requireAdminAuth, updateCareerOpening);
router.delete('/:id', requireAdminAuth, deleteCareerOpening);

export default router;
