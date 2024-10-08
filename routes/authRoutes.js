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

module.exports = router;
