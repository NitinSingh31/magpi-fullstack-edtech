import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'magpi_jwt_master_secret_key_2026_secure';

/**
 * Authentication Middleware for Admin-Only Endpoints
 * Verifies cryptographically signed JSON Web Token (JWT)
 */
export const requireAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Access denied: Authorization token is missing or malformed.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Your admin session has expired. Please log in again.'
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Access denied: Invalid authentication token.'
    });
  }
};
