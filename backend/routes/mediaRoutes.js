import { Router } from 'express';
import { 
  getSiteMedia, 
  updateSiteMediaItem, 
  resetSiteMediaItem 
} from '../controllers/mediaController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Public route to retrieve site images
router.get('/', getSiteMedia);

// Protected admin routes to update or reset images
router.put('/:key', requireAdminAuth, updateSiteMediaItem);
router.post('/:key/reset', requireAdminAuth, resetSiteMediaItem);

export default router;
