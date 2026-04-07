const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// ✅ Public routes
router.post('/register', register);
router.post('/login', login);

// ✅ Protected test route
router.get('/test', authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user
  });
});

// 🔐 ROLE-BASED ROUTES (ADD HERE 👇)

// ✅ Only ADMIN
router.get(
  '/admin-only',
  authMiddleware,
  roleMiddleware('ADMIN'),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// ✅ Only TECHNICIAN
router.get(
  '/tech-only',
  authMiddleware,
  roleMiddleware('TECHNICIAN'),
  (req, res) => {
    res.json({ message: "Welcome Technician" });
  }
);

// ✅ Only HOSPITAL
router.get(
  '/hospital-only',
  authMiddleware,
  roleMiddleware('HOSPITAL'),
  (req, res) => {
    res.json({ message: "Welcome Hospital" });
  }
);

module.exports = router;