import { Router } from 'express';
import { 
  createInquiry, 
  getInquiries 
} from '../controllers/inquiryController.js';

const router = Router();

router.route('/')
  .post(createInquiry)
  .get(getInquiries);

export default router;
