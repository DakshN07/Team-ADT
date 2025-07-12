const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Item = require('../models/Item');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload image to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      {
        folder: 'rewear',
        resource_type: 'auto'
      }
    );
    return result.secure_url;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

// Get all items (public)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      size, 
      condition, 
      search,
      minPoints,
      maxPoints 
    } = req.query;

    const query = { isApproved: true, isAvailable: true };

    // Apply filters
    if (category) query.category = category;
    if (size) query.size = size;
    if (condition) query.condition = condition;
    if (minPoints || maxPoints) {
      query.pointsValue = {};
      if (minPoints) query.pointsValue.$gte = parseInt(minPoints);
      if (maxPoints) query.pointsValue.$lte = parseInt(maxPoints);
    }
    if (search) {
      query.$text = { $search: search };
    }

    const items = await Item.find(query)
      .populate('owner', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Item.countDocuments(query);

    res.json({
      items,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('owner', 'name avatar location')
      .populate('approvedBy', 'name');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
});

// Create new item
router.post('/', authenticateToken, upload.array('images', 5), async (req, res) => {
  try {
    const {
      title,
      description,
      size,
      condition,
      category,
      tags,
      pointsValue,
      brand,
      color,
      material,
      location
    } = req.body;

    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadToCloudinary(file);
        imageUrls.push(url);
      }
    }

    const item = new Item({
      title,
      description,
      images: imageUrls,
      size,
      condition,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      pointsValue: parseInt(pointsValue),
      owner: req.user._id,
      brand,
      color,
      material,
      location
    });

    await item.save();

    res.status(201).json({
      message: 'Item created successfully',
      item
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating item', error: error.message });
  }
});

// Update item
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check ownership
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: 'Item updated successfully',
      item: updatedItem
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
});

// Delete item
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check ownership or admin
    if (item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

// Admin: Approve/Reject items
router.patch('/:id/approve', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { isApproved } = req.body;
    
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        isApproved,
        approvedBy: req.user._id,
        approvedAt: new Date()
      },
      { new: true }
    );

    res.json({
      message: `Item ${isApproved ? 'approved' : 'rejected'} successfully`,
      item
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item approval', error: error.message });
  }
});

// Get user's items
router.get('/user/me', authenticateToken, async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user items', error: error.message });
  }
});

module.exports = router; 