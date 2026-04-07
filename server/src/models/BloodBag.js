const mongoose = require('mongoose');

const bloodBagSchema = new mongoose.Schema({
  bagId: { type: String, unique: true },

  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },

  bloodGroup: { type: String, required: true },

  component: {
    type: String,
    enum: ['WHOLE', 'PLASMA', 'PLATELETS'],
    required: true
  },

  quantity: { type: Number },

  status: {
    type: String,
    enum: [
      'COLLECTED',
      'TESTING',
      'AVAILABLE',
      'RESERVED',
      'DISPATCHED',
      'DISCARDED'
    ],
    default: 'TESTING'
  },

  collectionDate: { type: Date, default: Date.now },

  expiryDate: { type: Date },

  testResult: {
    type: String,
    enum: ['PENDING', 'SAFE', 'UNSAFE'],
    default: 'PENDING'
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });

module.exports = mongoose.model('BloodBag', bloodBagSchema);