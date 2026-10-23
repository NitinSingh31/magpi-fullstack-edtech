import { storageService } from '../services/storageService.js';

/**
 * Public endpoint: Get all media slots with their currently active images
 */
export const getSiteMedia = async (req, res, next) => {
  try {
    const media = await storageService.getSiteMedia();
    return res.json({
      success: true,
      items: media.items,
      map: media.map
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin protected endpoint: Update / upload image for a specific media slot
 */
export const updateSiteMediaItem = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { imageUrl } = req.body;

    if (!key || !key.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Media slot key is required'
      });
    }

    if (imageUrl === undefined || imageUrl === null) {
      return res.status(400).json({
        success: false,
        error: 'imageUrl is required'
      });
    }

    const updatedBy = req.user?.username || 'admin';
    const updated = await storageService.updateSiteMediaItem(key, imageUrl, updatedBy);

    return res.json({
      success: true,
      message: `Media slot '${key}' updated successfully`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin protected endpoint: Reset a media slot back to its default asset
 */
export const resetSiteMediaItem = async (req, res, next) => {
  try {
    const { key } = req.params;

    if (!key || !key.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Media slot key is required'
      });
    }

    const updatedBy = req.user?.username || 'admin';
    const resetItem = await storageService.resetSiteMediaItem(key, updatedBy);

    return res.json({
      success: true,
      message: `Media slot '${key}' reset to default`,
      data: resetItem
    });
  } catch (error) {
    next(error);
  }
};
