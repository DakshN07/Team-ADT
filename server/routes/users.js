const express = require('express');
const User = require('../models/User');
const Item = require('../models/Item');
const Swap = require('../models/Swap');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { name, bio, location } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio, location },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Get user dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const [items, swapRequests, itemRequests] = await Promise.all([
      Item.find({ owner: req.user._id }).countDocuments(),
      Swap.find({ requester: req.user._id, status: 'pending' }).countDocuments(),
      Swap.find({ 
        requestedItem: { $in: await Item.find({ owner: req.user._id }).distinct('_id') },
        status: 'pending'
      }).countDocuments()
    ]);

    res.json({
      totalItems: items,
      pendingRequests: swapRequests,
      pendingItemRequests: itemRequests,
      points: req.user.points
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// Admin: Get all users
router.get('/admin/all', requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Admin: Get user details
router.get('/admin/:id', requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [items, swaps] = await Promise.all([
      Item.find({ owner: req.params.id }).countDocuments(),
      Swap.find({ requester: req.params.id }).countDocuments()
    ]);

    res.json({
      user,
      stats: {
        totalItems: items,
        totalSwaps: swaps
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
});

// Admin: Ban/Unban user
router.patch('/admin/:id/ban', requireAdmin, async (req, res) => {
  try {
    const { isBanned } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `User ${isBanned ? 'banned' : 'unbanned'} successfully`,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status', error: error.message });
  }
});

// Admin: Update user role
router.patch('/admin/:id/role', requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
});

// Admin: Get pending items for approval
router.get('/admin/pending-items', requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const items = await Item.find({ isApproved: false })
      .populate('owner', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Item.countDocuments({ isApproved: false });

    res.json({
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending items', error: error.message });
  }
});

// Admin: Get platform statistics
router.get('/admin/stats', requireAdmin, async (req, res) => {
  try {
    const [totalUsers, totalItems, totalSwaps, pendingItems] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      Swap.countDocuments(),
      Item.countDocuments({ isApproved: false })
    ]);

    res.json({
      totalUsers,
      totalItems,
      totalSwaps,
      pendingItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

module.exports = router; 