const express = require('express');
const { upload } = require('../config/cloudinary');
const { getAllProperties, getPropertyById, getRelatedByType, createProperty, deleteProperty, updateProperty } = require('../controllers/propertyController');

const router = express.Router();

router.get('/', getAllProperties);
router.get('/related', getRelatedByType);
router.get('/:id', getPropertyById);

// Update these to use the new Cloudinary 'upload'
router.post('/', upload.array('images', 10), createProperty);
router.put('/:id', upload.array('images', 10), updateProperty);

router.delete('/:id', deleteProperty);

module.exports = router;
