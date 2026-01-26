const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudStorageMuler = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog_covers',
        format: async (req, file) => ['jpg','png','jpeg'],
        public_id: (req, file) => `blog-${Date.now()}`  
    }
})

const uploadCloud = multer({ storage: cloudStorageMuler });

module.exports = {
    uploadCloud
}