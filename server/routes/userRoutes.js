import { Router } from 'express';
const router = Router();
import { registerUser, loginUser, getUserProfile ,updateUserProfile ,  getAllUsers,
  getDashboardStats,} from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/stats', protect, admin, getDashboardStats);
router.get('/', protect, admin, getAllUsers);

export default router;