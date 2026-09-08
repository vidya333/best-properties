const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  rent: Number,
  description: String,
  images: [String], 
  imageUrl: String,
  brokerName: String,
  brokerEmail: String,
  brokerPhone: String,
  type: String,
  flatType: String,
  availableFor: String,
  deposit: Number,
  carpetArea: Number,
  parking: String,
  furnished: String,
  facing: String,
  locationPin: String
});

module.exports = mongoose.model('Property', propertySchema);
