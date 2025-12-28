const User = require('../models/User');

// Mock Authentication Middleware
// In a real app, this would verify a JWT token from req.headers.authorization
const verifyUser = async (req, res, next) => {
  const userId = req.headers['x-user-id']; // Client sends user ID in header for this prototype
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No user ID provided' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};

module.exports = { verifyUser, checkRole };
