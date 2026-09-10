const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video"], required: true },
  src: { type: String, required: true }, 
  category: { 
    type: String, 
    enum: ["client-stories", "flats-locations", "inside-office", "other"], 
    default: "flats-locations" 
  },
  title: { type: String, default: "" },
  description: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Media", mediaSchema);