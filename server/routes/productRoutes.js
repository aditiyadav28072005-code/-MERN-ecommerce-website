import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getInventory,
} from'../controllers/productController.js';
import {upload} from '../middleware/uploadMiddleware.js';
import { protect,admin } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes (anyone can view products)
router.get('/', getProducts);
router.get('/inventory/all', protect, admin, getInventory);
router.get('/:id', getProductById);

// Admin-only routes
router.post('/', protect, admin, upload.single('image'), createProduct);
router.put('/:id', protect, admin, upload.single('image'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

//module.exports = router;
export default router;