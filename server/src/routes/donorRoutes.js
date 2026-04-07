const express = require('express');
const router = express.Router();

const {
  createDonor,
  getDonor
} = require('../controllers/donorController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔒 TECHNICIAN ONLY (or ADMIN)
router.post(
  '/',
  authMiddleware,
  roleMiddleware('TECHNICIAN', 'ADMIN'),
  createDonor
);

// 🔒 ANY LOGGED USER
router.get(
  '/:id',
  authMiddleware,
  getDonor
);

module.exports = router;