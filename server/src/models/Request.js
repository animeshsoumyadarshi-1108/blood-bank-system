const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  bloodGroup: { type: String, required: true },

  component: { type: String, required: true },

  quantityRequested: { type: Number, required: true },

  status: {
    type: String,
    enum: [
      'PENDING',
      'APPROVED',
      'REJECTED',
      'ALLOCATED',
      'DISPATCHED',
      'COMPLETED'
    ],
    default: 'PENDING'
  },

  isEmergency: { type: Boolean, default: false },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);