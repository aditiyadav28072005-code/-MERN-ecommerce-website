import multer from 'multer';

// Store file in memory temporarily as a buffer (not saved to local disk)
const storage = multer.memoryStorage();

const upload = multer({
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export { upload };



// import multer from 'multer';

// import express from 'express';
// import { upload } from '../middleware/cloudinaryStorage.js';
// import { protect, admin } from '../middleware/authMiddleware.js'; // Example middlewares


// // Store file in memory temporarily (not saved to disk)
// const storage = multer.memoryStorage();

// const upload = multer({
//      storage, 
//      limits:{fileSize: 5 * 1024 * 1024 } // Optional: limit file size to 5M 
//      });

// export{upload};



// const router = express.Router();

// // Example route for creating a product with a single image upload
// router.post('/upload', upload.single('image'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
    
//     // Cloudinary automatically returns the secure URL of the hosted image
//     res.status(200).json({
//       message: 'Image uploaded successfully!',
//       imageUrl: req.file.path // This contains the Cloudinary HTTPS URL
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
