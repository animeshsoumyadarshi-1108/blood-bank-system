const express = require('express');
const router = express.Router();

const {
  addBlood,
  updateTest,
  getAvailableBlood,
  getAllBlood   // 👈 ADD THIS
} = require('../controllers/bloodController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔹 ADD BLOOD (TECHNICIAN)
router.post(
  '/',
  authMiddleware,
  roleMiddleware('TECHNICIAN'),
  addBlood
);

// 🔹 UPDATE TEST RESULT
router.patch(
  '/:id/test',
  authMiddleware,
  roleMiddleware('TECHNICIAN'),
  updateTest
);

// 🔹 GET AVAILABLE BLOOD
router.get(
  '/available',
  authMiddleware,
  getAvailableBlood
);

// 🔥 ADD THIS (GET ALL BLOOD)
router.get(
  '/',
  authMiddleware,
  getAllBlood
);

module.exports = router;