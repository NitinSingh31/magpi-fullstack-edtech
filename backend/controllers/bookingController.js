import { storageService } from '../services/storageService.js';
import { isDatabaseConnected } from '../config/db.js';
import { emailService } from '../services/emailService.js';

export const createBooking = async (req, res, next) => {
  try {
    const { 
      parentName, 
      email, 
      phone, 
      curriculum, 
      grade, 
      subject, 
      preferredTime, 
      preferredDate,
      referenceCode,
      tutorPreference,
      whatsappUpdates 
    } = req.body;

    if (!parentName || !email || !phone || !subject) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide all required fields: parentName, email, phone, and subject' 
      });
    }

    const bookingRef = referenceCode || `MAG-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload = {
      parentName: parentName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      curriculum: curriculum || 'Cambridge IGCSE',
      grade: grade || 'Grade 9 - 10',
      subject: subject.trim(),
      preferredTime: preferredTime || 'Evening (5:00 PM - 8:00 PM)',
      preferredDate: preferredDate || '',
      referenceCode: bookingRef,
      tutorPreference: tutorPreference || '',
      whatsappUpdates: whatsappUpdates !== undefined ? whatsappUpdates : true,
      status: 'Pending',
      createdAt: new Date()
    };

    const result = await storageService.createBooking(payload);

    // Asynchronously dispatch email confirmation (non-blocking)
    emailService.sendBookingConfirmation(result).catch(err => {
      console.warn('[Booking] Email notification error:', err.message);
    });

    return res.status(201).json({
      success: true,
      source: isDatabaseConnected() ? 'mongodb' : 'local_storage',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await storageService.getBookings();
    return res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await storageService.updateBooking(id, updateData);

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    return res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
