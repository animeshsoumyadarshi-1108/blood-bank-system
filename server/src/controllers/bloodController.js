const BloodBag = require('../models/BloodBag');

// ✅ ADD BLOOD
exports.addBlood = async (req, res) => {
  // your existing code
};

// ✅ UPDATE TEST RESULT
exports.updateTest = async (req, res) => {
  // your existing code
};

// ✅ GET AVAILABLE BLOOD
exports.getAvailableBlood = async (req, res) => {
  // your existing code
};

// 🔥 ADD THIS AT THE BOTTOM
exports.getAllBlood = async (req, res) => {
  try {
    const blood = await BloodBag.find().sort({ createdAt: -1 });
    res.json(blood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};