import { v2 as cloudinary } from 'cloudinary';

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
};

export default configureCloudinary;

// //import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// //import { CloudinaryStorage } from 'multer-storage-cloudinary';

// // Configure Cloudinary (Make sure dotenv config runs before this)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;


//npm install multer cloudinary multer-storage-cloudinary



// Setup Cloudinary storage engine
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'mern-ecommerce-products', // Name of the folder in your Cloudinary dashboard
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed file extensions
//     transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional: automatically resize images
//   },
// });

// // Create the Multer upload middleware
// const upload = multer({ storage: storage });

// export { upload };
