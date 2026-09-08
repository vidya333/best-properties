const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  features: [String],
  images: [String],       
  brochure: String,       
  whatsappNumber: String,
  email: String
});

module.exports = mongoose.model("Project", projectSchema);
