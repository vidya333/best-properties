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
  params: {
    folder: 'vmprosperitygroup', // folder name in your Cloudinary account
    resource_type: 'auto',  
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp','mp4','pdf'],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };