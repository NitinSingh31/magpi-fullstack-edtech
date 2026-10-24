import { Router } from 'express';
import { 
  getLeadership, 
  createLeadership, 
  updateLeadership, 
  deleteLeadership 
} from '../controllers/leadershipController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route to view active leadership members
router.get('/', getLeadership);

// Protected admin routes to manage leadership members
router.post('/', requireAdminAuth, createLeadership);
router.patch('/:id', requireAdminAuth, updateLeadership);
router.delete('/:id', requireAdminAuth, deleteLeadership);

export default router;
