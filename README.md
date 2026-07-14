# MERN Shop — Full Stack E-commerce Website

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js). Users can browse products, search and filter by category, manage a cart and wishlist, place orders, and view order history. Admins have a separate dashboard to manage products, orders, users, and inventory.

## Live Demo
- Frontend: [your-vercel-url]
- Backend API: [your-render-url]

## Tech Stack

**Frontend:** React.js, React Router DOM, Tailwind CSS, Axios, Context API
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose
**Authentication:** JWT, bcrypt
**Image Storage:** Cloudinary
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Features

### User
- Register, login, logout (JWT-based authentication)
- Browse, search, and filter products by category
- View product details and submit reviews/ratings
- Add/remove items from cart and wishlist, update quantities
- Checkout and place orders (Cash on Delivery)
- View order history with order status tracking
- Edit profile information

### Admin
- Dashboard with store statistics (products, orders, users, revenue)
- Add, edit, and delete products (with image upload via Cloudinary)
- View and update order status (Pending → Processing → Shipped → Delivered)
- View all registered users
- Inventory view sorted by stock level, with low-stock indicators

## Architecture Notes

- **Frontend and backend are fully decoupled**, communicating over a REST API.
- **State management** uses React's Context API (AuthContext for user session, CartContext for cart/wishlist) instead of Redux, since the app's state complexity didn't justify the extra dependency.
- **Cart and wishlist are stored client-side** (localStorage) and only sent to the backend at checkout, since they don't need to sync across devices for this project's scope.
- **Order data snapshots product details** (name, image, price) at the time of purchase, so past orders remain accurate even if a product's price changes or the product is later deleted.
- **Backend recalculates order totals** from the database rather than trusting the frontend's calculated total, to prevent price tampering.
- **Product images are stored in Cloudinary**, with only the URL saved in MongoDB, keeping the database lightweight.

## Project Structure

\`\`\`
mern-ecommerce/
├── client/     # React frontend
└── server/     # Express backend (REST API)
\`\`\`

## Running Locally

### Backend
\`\`\`bash
cd server
npm install
# create a .env file (see .env.example)
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd client
npm install
# create a .env file (see .env.example)
npm run dev
\`\`\`

## Environment Variables

**server/.env**
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
\`\`\`

**client/.env**
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

