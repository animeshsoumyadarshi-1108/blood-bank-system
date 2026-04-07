const Request = require('../models/Request');
const { allocateBlood } = require('../services/allocationService');

// CREATE REQUEST
exports.createRequest = async (req, res) => {
  try {
    const request = await Request.create(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL REQUESTS
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('hospitalId');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 ADD THIS FUNCTION HERE (DON’T REPLACE ABOVE)

// ALLOCATE BLOOD
exports.allocate = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const bags = await allocateBlood(request);

    request.status = 'ALLOCATED';
    await request.save();

    res.json({
      message: "Blood allocated",
      bags
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const RequestItem = require('../models/RequestItem');
const BloodBag = require('../models/BloodBag');

// DISPATCH BLOOD
exports.dispatch = async (req, res) => {
  try {
    const items = await RequestItem.find({
      requestId: req.params.id
    });

    if (!items.length) {
      return res.status(404).json({ message: "No allocated items found" });
    }

    for (const item of items) {
      // update request item
      item.status = 'DISPATCHED';
      await item.save();

      // update blood bag
      const bag = await BloodBag.findById(item.bloodBagId);
      bag.status = 'DISPATCHED';
      await bag.save();
    }

    res.json({ message: "Blood dispatched successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};