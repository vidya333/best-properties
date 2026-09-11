const express = require('express');
const router = express.Router();
const { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial,
  deleteTestimonial 
} = require('../controllers/testimonialController');

const verifyToken = require('../middleware/auth');
const { upload } = require('../config/cloudinary'); 

router.get('/', getTestimonials);
router.post('/', verifyToken, upload.single('image'), createTestimonial);
router.put('/:id', verifyToken, upload.single('image'), updateTestimonial);
router.delete('/:id', verifyToken, deleteTestimonial);

module.exports = router;