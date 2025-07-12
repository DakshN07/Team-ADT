const express = require('express');
const Swap = require('../models/Swap');
const Item = require('../models/Item');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create swap request
router.post('/', async (req, res) => {
  try {
    const { requestedItemId, offeredItemId, type, pointsOffered, message } = req.body;

    // Validate request
    if (!requestedItemId) {
      return res.status(400).json({ message: 'Requested item is required' });
    }

    if (type === 'swap' && !offeredItemId) {
      return res.status(400).json({ message: 'Offered item is required for swaps' });
    }

    if (type === 'points' && !pointsOffered) {
      return res.status(400).json({ message: 'Points are required for point redemption' });
    }

    // Check if requested item exists and is available
    const requestedItem = await Item.findById(requestedItemId);
    if (!requestedItem || !requestedItem.isAvailable || !requestedItem.isApproved) {
      return res.status(404).json({ message: 'Requested item not available' });
    }

    // Check if user is trying to swap their own item
    if (requestedItem.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot request your own item' });
    }

    // Check if user has enough points for point redemption
    if (type === 'points') {
      if (req.user.points < pointsOffered) {
        return res.status(400).json({ message: 'Insufficient points' });
      }
    }

    // Check if offered item exists and belongs to user (for swaps)
    if (type === 'swap' && offeredItemId) {
      const offeredItem = await Item.findById(offeredItemId);
      if (!offeredItem || offeredItem.owner.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: 'Invalid offered item' });
      }
    }

    // Check if there's already a pending request for this item
    const existingRequest = await Swap.findOne({
      requester: req.user._id,
      requestedItem: requestedItemId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending request for this item' });
    }

    const swap = new Swap({
      requester: req.user._id,
      requestedItem: requestedItemId,
      offeredItem: offeredItemId,
      type,
      pointsOffered,
      message
    });

    await swap.save();

    res.status(201).json({
      message: 'Swap request created successfully',
      swap
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating swap request', error: error.message });
  }
});

// Get user's swap requests (as requester)
router.get('/my-requests', async (req, res) => {
  try {
    const swaps = await Swap.find({ requester: req.user._id })
      .populate('requestedItem', 'title images pointsValue owner')
      .populate('offeredItem', 'title images pointsValue')
      .populate('requestedItem.owner', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ swaps });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching swap requests', error: error.message });
  }
});

// Get swap requests for user's items (as owner)
router.get('/my-items-requests', async (req, res) => {
  try {
    // Get user's items
    const userItems = await Item.find({ owner: req.user._id });
    const itemIds = userItems.map(item => item._id);

    const swaps = await Swap.find({ 
      requestedItem: { $in: itemIds },
      status: 'pending'
    })
      .populate('requester', 'name avatar points')
      .populate('requestedItem', 'title images pointsValue')
      .populate('offeredItem', 'title images pointsValue')
      .sort({ createdAt: -1 });

    res.json({ swaps });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item requests', error: error.message });
  }
});

// Respond to swap request (accept/reject)
router.patch('/:id/respond', async (req, res) => {
  try {
    const { status, message } = req.body;
    const swap = await Swap.findById(req.params.id)
      .populate('requestedItem')
      .populate('requester');

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Check if user owns the requested item
    if (swap.requestedItem.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ message: 'Swap request already processed' });
    }

    // Update swap status
    swap.status = status;
    swap.respondedAt = new Date();

    if (status === 'accepted') {
      // Handle accepted swap
      if (swap.type === 'points') {
        // Transfer points
        await User.findByIdAndUpdate(swap.requester._id, {
          $inc: { points: -swap.pointsOffered }
        });
        await User.findByIdAndUpdate(req.user._id, {
          $inc: { points: swap.pointsOffered }
        });

        // Mark item as unavailable
        await Item.findByIdAndUpdate(swap.requestedItem._id, {
          isAvailable: false
        });
      } else if (swap.type === 'swap') {
        // Handle item swap
        await Item.findByIdAndUpdate(swap.requestedItem._id, {
          isAvailable: false
        });
        await Item.findByIdAndUpdate(swap.offeredItem, {
          isAvailable: false
        });
      }
    }

    await swap.save();

    res.json({
      message: `Swap request ${status} successfully`,
      swap
    });
  } catch (error) {
    res.status(500).json({ message: 'Error responding to swap request', error: error.message });
  }
});

// Cancel swap request
router.patch('/:id/cancel', async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ message: 'Swap request not found' });
    }

    // Check if user is the requester
    if (swap.requester.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot cancel processed request' });
    }

    swap.status = 'cancelled';
    swap.cancelledBy = req.user._id;
    await swap.save();

    res.json({
      message: 'Swap request cancelled successfully',
      swap
    });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling swap request', error: error.message });
  }
});

// Get swap history
router.get('/history', async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [
        { requester: req.user._id },
        { 'requestedItem.owner': req.user._id }
      ],
      status: { $in: ['accepted', 'completed', 'cancelled'] }
    })
      .populate('requester', 'name avatar')
      .populate('requestedItem', 'title images')
      .populate('offeredItem', 'title images')
      .sort({ updatedAt: -1 });

    res.json({ swaps });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching swap history', error: error.message });
  }
});

module.exports = router; 