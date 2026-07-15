
import 'dotenv/config'; // Must be line 1 to load environment maps immediatelyimport express, { json } from 'express';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js';
//dotenv.config(); // Load variables from .env into process.env
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
//app.use(cors()); // Allow frontend to make requests to this server
// app.use(cors({
//   origin: [
//     'https://mern-ecommerce-website-8qcg.onrender.com/',
//     process.env.CLIENT_URL, // we'll set this after deploying to Vercel
//   ],
// }));
app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.CLIENT_URL,
  ],
}));
app.use(express.json()); // Allow server to read JSON from request body

// Test route
app.get('/api/test', (req, res) => {
  res.json(
    {
       message: 'Server is working!'
    });
});

app.use('/api/users', userRoutes); // NEW
app.use('/api/products', productRoutes); // NEW
app.use('/api/orders',orderRoutes)
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});