const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../controllers/multerfile'); // Middleware for handling file uploads

const router = express.Router();

router.route('/')
  .get(getProducts) // Fetch all products
  .post(protect,upload.single('image'), createProduct); // Create a new product

router.route('/:id')
  .get(getProductById) // Fetch a single product by ID
  .put(protect, updateProduct) // Update a product by ID
  .delete(protect, deleteProduct); // Delete a product by ID

module.exports = router;