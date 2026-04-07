const Donor = require('../models/Donor');
const calculateEligibility = require('../utils/calculateEligibility');

// CREATE DONOR
exports.createDonor = async (req, res) => {
  try {
    const data = req.body;

    let eligibility = { isEligible: true };

    if (data.lastDonationDate) {
      eligibility = calculateEligibility(data.lastDonationDate);
    }

    const donor = await Donor.create({
      ...data,
      ...eligibility
    });

    res.status(201).json(donor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DONOR
exports.getDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json(donor);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};