import { Router } from 'express';
import { 
  getCareerOpenings, 
  createCareerOpening, 
  updateCareerOpening, 
  deleteCareerOpening 
} from '../controllers/careerController.js';

const router = Router();

router.get('/', getCareerOpenings);
router.post('/', createCareerOpening);
router.patch('/:id', updateCareerOpening);
router.delete('/:id', deleteCareerOpening);

export default router;
