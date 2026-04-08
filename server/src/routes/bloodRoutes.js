const express = require('express');
const router = express.Router();

const { addBlood, getAllBlood } = require('../controllers/bloodController');

const authMiddleware = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

// ✅ ADD BLOOD (only ADMIN + TECHNICIAN)
router.post(
  '/',
  authMiddleware,
  authorizeRoles("ADMIN", "TECHNICIAN"),
  addBlood
);

// ✅ GET BLOOD (any logged in user)
router.get(
  '/',
  authMiddleware,
  getAllBlood
);

module.exports = router;