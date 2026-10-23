import { Router } from 'express';
import { 
  createBooking, 
  getBookings, 
  updateBookingStatus 
} from '../controllers/bookingController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .post(createBooking)
  .get(requireAdminAuth, getBookings);

router.route('/:id')
  .patch(requireAdminAuth, updateBookingStatus);

export default router;
