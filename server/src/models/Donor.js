const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },

  age: { type: Number, required: true },

  bloodGroup: { type: String, required: true },

  weight: { type: Number, required: true },

  contactNumber: { type: String, required: true },

  lastDonationDate: { type: Date },

  nextEligibleDate: { type: Date },

  isEligible: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);