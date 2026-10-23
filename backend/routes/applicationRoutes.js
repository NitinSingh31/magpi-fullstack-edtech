import { Router } from 'express';
import { 
  submitApplication, 
  getApplications, 
  updateApplicationStatus 
} from '../controllers/applicationController.js';

const router = Router();

router.post('/', submitApplication);
router.get('/', getApplications);
router.patch('/:id/status', updateApplicationStatus);

export default router;
