import { storageService } from '../services/storageService.js';
import { isDatabaseConnected } from '../config/db.js';

export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, grade, course, message, type = 'contact' } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required' });
    }

    const payload = {
      name: name ? name.trim() : '',
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      grade: grade || '',
      course: course || '',
      type,
      message: message ? message.trim() : '',
      createdAt: new Date()
    };

    const result = await storageService.createInquiry(payload);

    return res.status(201).json({
      success: true,
      source: isDatabaseConnected() ? 'mongodb' : 'local_storage',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await storageService.getInquiries();
    return res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    next(error);
  }
};
