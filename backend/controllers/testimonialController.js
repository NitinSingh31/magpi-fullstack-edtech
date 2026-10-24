import { storageService } from '../services/storageService.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const activeOnly = req.query.activeOnly === 'true';
    const testimonials = await storageService.getTestimonials({ activeOnly });
    return res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const { 
      author, 
      role, 
      quote, 
      rating,
      isActive,
      order 
    } = req.body;

    if (!author || !author.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Author name is required'
      });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Author role or description (e.g. Parent of...) is required'
      });
    }

    if (!quote || !quote.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Testimonial quote text is required'
      });
    }

    const payload = {
      author: author.trim(),
      role: role.trim(),
      quote: quote.trim(),
      rating: rating !== undefined ? Number(rating) : 5,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      order: order !== undefined ? Number(order) : 0
    };

    const created = await storageService.createTestimonial(payload);
    return res.status(201).json({
      success: true,
      data: created
    });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = {};

    const allowedFields = ['author', 'role', 'quote', 'rating', 'isActive', 'order'];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const updated = await storageService.updateTestimonial(id, updateData);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
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

export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await storageService.deleteTestimonial(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    return res.json({
      success: true,
      message: 'Testimonial deleted successfully',
      data: deleted
    });
  } catch (error) {
    next(error);
  }
};
