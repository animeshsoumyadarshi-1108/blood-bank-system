const express = require('express');
const router = express.Router();

const {
  getDashboard,
  getLowStock,
  getExpiry   // 👈 ADD HERE
} = require('../controllers/adminController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔒 ADMIN ONLY - Dashboard
router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getDashboard
);

// 🔒 ADMIN ONLY - Low Stock
router.get(
  '/low-stock',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getLowStock
);

// 🔥 ADD THIS (Expiry API)
router.get(
  '/expiry',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getExpiry
);

module.exports = router;