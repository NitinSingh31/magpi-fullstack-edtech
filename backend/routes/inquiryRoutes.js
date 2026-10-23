import { Router } from 'express';
import { 
  createInquiry, 
  getInquiries 
} from '../controllers/inquiryController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .post(createInquiry)
  .get(requireAdminAuth, getInquiries);

export default router;
