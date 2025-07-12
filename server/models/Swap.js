const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  offeredItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  type: {
    type: String,
    enum: ['swap', 'points'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  pointsOffered: {
    type: Number,
    default: 0
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  respondedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancellationReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
swapSchema.index({ requester: 1, status: 1 });
swapSchema.index({ requestedItem: 1, status: 1 });

module.exports = mongoose.model('Swap', swapSchema); 