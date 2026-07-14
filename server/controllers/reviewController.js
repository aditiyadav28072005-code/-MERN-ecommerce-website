import Review from'../models/Review.js';
import Product from'../models/Product.js';

// @desc   Get all reviews for a product
// @route  GET /api/reviews/:productId
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// @desc   Add a review to a product
// @route  POST /api/reviews/:productId
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Prevent the same user from reviewing the same product twice
    const alreadyReviewed = await Review.findOne({
      product: req.params.productId,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = await Review.create({
      user: req.user._id,
      product: req.params.productId,
      rating,
      comment,
    });

    // Recalculate the product's average rating and review count
    const allReviews = await Review.find({ product: req.params.productId });
    product.numReviews = allReviews.length;
    product.rating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await product.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export { getProductReviews, addReview };