import Product from '../models/Product.js' 
import configureCloudinary from '../config/cloudinary.js'
// import { v2 as cloudinary } from 'cloudinary';

// @desc   Create a new product (admin only)
// @route  POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }


    // Initialize Cloudinary inside the execution lifecycle loop
    const cloudinary = configureCloudinary();

    // Upload image buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'ecommerce-products' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image: result.secure_url,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// @desc   Get all products (with optional search & category filter)
// @route  GET /api/products
const getProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    // Build a filter object dynamically based on what was sent
    let filter = {};

    if (keyword) {
      filter.name = { $regex: keyword, $options: 'i' }; // case-insensitive search
    }

    if (category) {
     filter.category = { $regex: `^${category}$`, $options: 'i' };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// @desc   Get single product by ID
// @route  GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// @desc   Update a product (admin only)
// @route  PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, description, price, category, stock } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    // If a new image was uploaded, replace it
    if (req.file) {
         // Re-initialize Cloudinary context here for update uploads
      const cloudinary = configureCloudinary();
      
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'ecommerce-products' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      product.image = result.secure_url;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// @desc   Delete a product (admin only)
// @route  DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// @desc   Get all products sorted by stock (for inventory view)
// @route  GET /api/products/inventory/all
const getInventory = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ stock: 1 }); // lowest stock first
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};




export{
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getInventory,
};