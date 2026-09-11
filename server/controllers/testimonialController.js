const Testimonial = require('../models/Testimonial');

// Get all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

// Add new testimonial (Admin only)
exports.createTestimonial = async (req, res) => {
  try {
    const testimonialData = { ...req.body };
    
    // If an image was uploaded via Cloudinary, save its secure URL
    if (req.file) {
      testimonialData.image = req.file.path;
    }

    const newTestimonial = new Testimonial(testimonialData);
    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(400).json({ error: 'Failed to create testimonial' });
  }
};

// Update testimonial (Admin only)
exports.updateTestimonial = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If a new image was uploaded, update the image path too
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(400).json({ error: 'Failed to update testimonial' });
  }
};

// Delete testimonial (Admin only)
exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};