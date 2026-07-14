import { Router } from 'express';
const router = Router();
import { getProductReviews , addReview } from '../controllers/reviewController.js';
import { protect,admin } from '../middleware/authMiddleware.js';


router.get('/:productId', getProductReviews);
router.post('/:productId', protect, addReview);

export default router;