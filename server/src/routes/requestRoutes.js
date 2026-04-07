const express = require('express');
const router = express.Router();

const {
  createRequest,
  getAllRequests,
  allocate,
  dispatch
} = require('../controllers/requestController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 🔒 HOSPITAL ONLY
router.post(
  '/',
  authMiddleware,
  roleMiddleware('HOSPITAL'),
  createRequest
);

// 🔒 ADMIN ONLY
router.post(
  '/:id/allocate',
  authMiddleware,
  roleMiddleware('ADMIN'),
  allocate
);

// 🔒 TECHNICIAN ONLY
router.patch(
  '/:id/dispatch',
  authMiddleware,
  roleMiddleware('TECHNICIAN'),
  dispatch
);

// 🔒 ANY LOGGED USER
router.get(
  '/',
  authMiddleware,
  getAllRequests
);

module.exports = router;