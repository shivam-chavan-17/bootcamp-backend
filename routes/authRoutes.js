const express = require('express');
const { signupUser, loginUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

// Test routes for role-based access
router.get('/student', protect, roleMiddleware('student'), (req, res) => {
  res.send('Hello Student');
});

router.get('/admin', protect, roleMiddleware('admin'), (req, res) => {
  res.send('Hello Admin');
});

router.get('/profile', protect, (req, res) => {
  const user = req.user;
  if (user) {
      res.json({
          name: user.name,
          email: user.email,
          role: user.role
      });
  } else {
      res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;
