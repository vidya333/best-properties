const express = require('express');
const { upload } = require('../config/cloudinary');
const { getAllProperties, getPropertyById, getRelatedByType, createProperty, deleteProperty, updateProperty } = require('../controllers/propertyController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllProperties);
router.get('/related', getRelatedByType);
router.get('/:id', getPropertyById);

router.post('/', verifyToken, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 3 }
]), createProperty);

router.put('/:id', verifyToken, upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 3 }
]), updateProperty);

router.delete('/:id',verifyToken, deleteProperty);

module.exports = router;
