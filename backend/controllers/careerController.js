import { storageService } from '../services/storageService.js';

export const getCareerOpenings = async (req, res, next) => {
  try {
    const activeOnly = req.query.activeOnly === 'true';
    const openings = await storageService.getCareerOpenings({ activeOnly });
    return res.json({
      success: true,
      count: openings.length,
      data: openings
    });
  } catch (error) {
    next(error);
  }
};

export const createCareerOpening = async (req, res, next) => {
  try {
    const { 
      title, 
      type, 
      location, 
      compensation, 
      boards, 
      requirements, 
      isActive,
      order 
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Job title is required'
      });
    }

    const payload = {
      title: title.trim(),
      type: type ? type.trim() : 'Remote Flexible',
      location: location ? location.trim() : 'Global (Remote)',
      compensation: compensation ? compensation.trim() : '$35 - $65 / hr',
      boards: boards ? boards.trim() : '',
      requirements: requirements ? requirements.trim() : '',
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      order: order !== undefined ? Number(order) : 0
    };

    const created = await storageService.createCareerOpening(payload);
    return res.status(201).json({
      success: true,
      data: created
    });
  } catch (error) {
    next(error);
  }
};

export const updateCareerOpening = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = {};

    const allowedFields = ['title', 'type', 'location', 'compensation', 'boards', 'requirements', 'isActive', 'order'];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const updated = await storageService.updateCareerOpening(id, updateData);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Career opening not found'
      });
    }

    return res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCareerOpening = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await storageService.deleteCareerOpening(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Career opening not found'
      });
    }

    return res.json({
      success: true,
      message: 'Career opening deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
