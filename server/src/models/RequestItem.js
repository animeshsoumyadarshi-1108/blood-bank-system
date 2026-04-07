const mongoose = require('mongoose');

const requestItemSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true
  },

  bloodBagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodBag',
    required: true
  },

  allocatedAt: { type: Date, default: Date.now },

  status: {
    type: String,
    enum: ['ALLOCATED', 'DISPATCHED'],
    default: 'ALLOCATED'
  }

}, { timestamps: true });

module.exports = mongoose.model('RequestItem', requestItemSchema);