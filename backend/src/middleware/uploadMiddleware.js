import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Конфігурація Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Налаштування сховища
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'my_blog_images', // назва папки в Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, crop: 'limit' }] // стискати великі фото
  },
  
});

export const upload = multer({ storage });