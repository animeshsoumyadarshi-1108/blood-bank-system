const BloodBag = require('../models/BloodBag');
const RequestItem = require('../models/RequestItem');

exports.allocateBlood = async (request) => {
  const bags = await BloodBag.find({
    bloodGroup: request.bloodGroup,
    component: request.component,
    status: 'AVAILABLE'
  }).sort({ collectionDate: 1 }); // FIFO

  if (bags.length < request.quantityRequested) {
    throw new Error("Not enough blood available");
  }

  const selectedBags = bags.slice(0, request.quantityRequested);

  for (const bag of selectedBags) {
    // update bag status
    bag.status = 'RESERVED';
    await bag.save();

    // create request item
    await RequestItem.create({
      requestId: request._id,
      bloodBagId: bag._id
    });
  }

  return selectedBags;
};