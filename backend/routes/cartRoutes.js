const express = require('express');
const { getCartItems, addItemToCart, updateItemQuantity, removeItemFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getCartItems); // Get cart items
router.post('/', protect, addItemToCart); // Add item to cart
router.put('/:itemId', protect, updateItemQuantity); // Update item quantity
router.delete('/:itemId', protect, removeItemFromCart); // Remove item from cart

module.exports = router;