const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // If it's a PDF or document, treat it as 'raw', otherwise let 'auto' handle images/videos
    let resourceType = 'auto';
    if (file.mimetype === 'application/pdf' || file.mimetype.includes('document')) {
      resourceType = 'raw';
    }

    return {
      folder: 'best-properties', 
      resource_type: resourceType,  
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'pdf', 'doc', 'docx'],
    };
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };