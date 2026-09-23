const Property = require('../models/Property');

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRelatedByType = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) return res.status(400).json({ message: 'type query required' });
    const related = await Property.find({ type }).limit(6);
    res.json(related);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE Property (Cloudinary Updated)
const createProperty = async (req, res) => {
  try {
    let uploadedImages = [];
    let uploadedVideos = [];

    if (req.files) {
      if (req.files.images && req.files.images.length > 0) {
        uploadedImages = req.files.images.map(file => file.path);
      }
      if (req.files.videos && req.files.videos.length > 0) {
        uploadedVideos = req.files.videos.map(file => file.path);
      }
    }

    const property = new Property({
      ...req.body,
      price: Number(req.body.price),
      rent: req.body.rent ? Number(req.body.rent) : null,
      deposit: req.body.deposit ? Number(req.body.deposit) : null,
      carpetArea: req.body.carpetArea ? Number(req.body.carpetArea) : null,
      images: uploadedImages,
      imageUrl: uploadedImages[0] || '',
      videos: uploadedVideos // <-- Save videos
    });

    await property.save();
    res.status(201).json({ message: 'Property created successfully', property });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating property', error: err.message });
  }
};

// UPDATE Property (Cloudinary Updated)
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const oldProperty = await Property.findById(id);
    if (!oldProperty) return res.status(404).json({ message: 'Property not found' });

    let uploadedImages = oldProperty.images;
    let uploadedVideos = oldProperty.videos || [];

    if (req.files) {
      if (req.files.images && req.files.images.length > 0) {
        uploadedImages = req.files.images.map(file => file.path);
      }
      if (req.files.videos && req.files.videos.length > 0) {
        uploadedVideos = req.files.videos.map(file => file.path);
      }
    }

    const updated = await Property.findByIdAndUpdate(
      id,
      {
        ...req.body,
        price: req.body.price ? Number(req.body.price) : null,
        rent: req.body.rent ? Number(req.body.rent) : null,
        deposit: req.body.deposit ? Number(req.body.deposit) : null,
        carpetArea: req.body.carpetArea ? Number(req.body.carpetArea) : null,
        images: uploadedImages,
        imageUrl: uploadedImages[0] || oldProperty.imageUrl,
        videos: uploadedVideos // <-- Update videos
      },
      { new: true }
    );

    res.json({ message: 'Property updated successfully', property: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating property', error: err.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Property.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllProperties, getPropertyById, getRelatedByType, createProperty, deleteProperty, updateProperty };
