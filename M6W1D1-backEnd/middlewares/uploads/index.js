const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'jpg',
        transfomation :[{width:400,heigth:600,crop:'fill',gravity:'auto'}],
        public_id: (req, file) => file.name
    }
})

const uploadCloud = multer({ storage: cloudStorage });

module.exports = {
    uploadCloud
}