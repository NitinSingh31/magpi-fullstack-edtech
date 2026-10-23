import jwt from 'jsonwebtoken';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'magpi2026';
const JWT_SECRET = process.env.JWT_SECRET || 'magpi_jwt_master_secret_key_2026_secure';

export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Please enter the admin security passkey.'
      });
    }

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        error: 'Invalid security passkey. Access denied.'
      });
    }

    // Sign cryptographic token valid for 12 hours
    const token = jwt.sign(
      {
        role: 'admin',
        scope: 'leads_and_careers_management'
      },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    return res.json({
      success: true,
      token,
      expiresIn: '12h',
      message: 'Portal unlocked successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Authentication server error.'
    });
  }
};

export const verifySession = async (req, res) => {
  // Handled after requireAdminAuth middleware
  return res.json({
    success: true,
    authenticated: true,
    role: req.admin?.role || 'admin'
  });
};
