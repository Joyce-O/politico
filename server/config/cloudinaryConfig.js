import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import cloudinaryStorage from 'multer-storage-cloudinary';

dotenv.config();

// const cloudinaryConfig = (req, res, next) => {
// config({
// cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// api_key: process.env.CLOUDINARY_API_KEY,
// api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// next();
// }
// export { cloudinaryConfig, uploader };
export default cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'politico-image',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

export default storage;
