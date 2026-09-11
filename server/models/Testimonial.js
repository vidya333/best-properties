const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  role: { type: String, default: '' },
  company: { type: String, default: '' },
  message: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  image: { type: String, default: '' }, 
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);