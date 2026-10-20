import { Router } from 'express';
import { 
  createBooking, 
  getBookings, 
  updateBookingStatus 
} from '../controllers/bookingController.js';

const router = Router();

router.route('/')
  .post(createBooking)
  .get(getBookings);

router.route('/:id')
  .patch(updateBookingStatus);

export default router;
