import jwt from 'jsonwebtoken';

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'magpi2026';
const JWT_SECRET = process.env.JWT_SECRET || 'magpi_jwt_master_secret_key_2026_secure';

export const adminLogin = async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your password.'
      });
    }

    const allowedUsernames = [
      ADMIN_USERNAME,
      'admin',
      'magpi',
      'contact@magpiedu.com',
      'admin@magpiedu.com',
      'recruiter'
    ];

    if (username && username.trim()) {
      const normalizedUser = username.trim().toLowerCase();
      if (!allowedUsernames.includes(normalizedUser)) {
        return res.status(401).json({
          success: false,
          error: 'Invalid username or password.'
        });
      }
    }

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password.'
      });
    }

    // Sign cryptographic token (7 days if rememberMe, otherwise 12 hours)
    const expiresIn = rememberMe ? '7d' : '12h';
    const token = jwt.sign(
      {
        role: 'admin',
        username: username || 'admin',
        scope: 'leads_and_careers_management'
      },
      JWT_SECRET,
      { expiresIn }
    );

    return res.json({
      success: true,
      token,
      expiresIn,
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
