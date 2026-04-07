const BloodBag = require('../models/BloodBag');
const Request = require('../models/Request');
const Donor = require('../models/Donor');

// ✅ Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalBlood = await BloodBag.countDocuments();
    const availableBlood = await BloodBag.countDocuments({ status: 'AVAILABLE' });

    const totalRequests = await Request.countDocuments();
    const pendingRequests = await Request.countDocuments({ status: 'PENDING' });

    const totalDonors = await Donor.countDocuments();

    res.json({
      totalBlood,
      availableBlood,
      totalRequests,
      pendingRequests,
      totalDonors
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 ADD THIS BELOW (yes, at bottom)
exports.getLowStock = async (req, res) => {
  try {
    const result = await BloodBag.aggregate([
      { $match: { status: 'AVAILABLE' } },
      {
        $group: {
          _id: { bloodGroup: '$bloodGroup', component: '$component' },
          count: { $sum: 1 }
        }
      },
      { $match: { count: { $lt: 2 } } }
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpiry = async (req, res) => {
  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const expiring = await BloodBag.find({
      expiryDate: { $lte: next7Days },
      status: { $ne: 'DISCARDED' }
    });

    res.json(expiring);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};