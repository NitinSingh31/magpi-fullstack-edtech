import { storageService } from '../services/storageService.js';

export const submitApplication = async (req, res, next) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      role, 
      experience, 
      qualification, 
      linkedin, 
      subject, 
      notes,
      resume 
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide full name, email, and phone number'
      });
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role ? role.trim() : 'General Faculty Application',
      experience: experience || '3 - 5 Years',
      qualification: qualification ? qualification.trim() : '',
      linkedin: linkedin ? linkedin.trim() : '',
      subject: subject ? subject.trim() : '',
      notes: notes ? notes.trim() : '',
      resume: {
        fileName: resume?.fileName || '',
        fileSize: resume?.fileSize || 0,
        fileType: resume?.fileType || '',
        fileData: resume?.fileData || '',
        fileUrl: resume?.fileUrl || ''
      },
      status: 'New',
      createdAt: new Date()
    };

    const result = await storageService.createFacultyApplication(payload);
    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const applications = await storageService.getFacultyApplications();
    return res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }

    const updated = await storageService.updateFacultyApplicationStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    return res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
