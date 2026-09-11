const express = require('express');
const { upload } = require('../config/cloudinary');
const { getAllProperties, getPropertyById, getRelatedByType, createProperty, deleteProperty, updateProperty } = require('../controllers/propertyController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllProperties);
router.get('/related', getRelatedByType);
router.get('/:id', getPropertyById);

router.post('/',verifyToken, upload.array('images', 10), createProperty);
router.put('/:id',verifyToken, upload.array('images', 10), updateProperty);
router.delete('/:id',verifyToken, deleteProperty);

module.exports = router;
