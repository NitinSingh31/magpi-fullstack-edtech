import { storageService } from '../services/storageService.js';

export const getLeadership = async (req, res, next) => {
  try {
    const activeOnly = req.query.activeOnly === 'true';
    const leadership = await storageService.getLeadership({ activeOnly });
    return res.json({
      success: true,
      count: leadership.length,
      data: leadership
    });
  } catch (error) {
    next(error);
  }
};

export const createLeadership = async (req, res, next) => {
  try {
    const { 
      name, 
      role, 
      credentials, 
      subjects, 
      image, 
      isActive,
      order 
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Leader full name is required'
      });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Role / Designation is required'
      });
    }

    const payload = {
      name: name.trim(),
      role: role.trim(),
      credentials: credentials ? credentials.trim() : '',
      subjects: subjects ? subjects.trim() : '',
      image: image && image.trim() ? image.trim() : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      order: order !== undefined ? Number(order) : 0
    };

    const created = await storageService.createLeadership(payload);
    return res.status(201).json({
      success: true,
      data: created
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = {};

    const allowedFields = ['name', 'role', 'credentials', 'subjects', 'image', 'isActive', 'order'];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const updated = await storageService.updateLeadership(id, updateData);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Leadership member not found'
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

export const deleteLeadership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await storageService.deleteLeadership(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Leadership member not found'
      });
    }

    return res.json({
      success: true,
      message: 'Leadership member deleted successfully',
      data: deleted
    });
  } catch (error) {
    next(error);
  }
};
