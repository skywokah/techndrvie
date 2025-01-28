const Order = require('../models/Order');

// Place an order
exports.placeOrder = async (req, res) => {
  const { email, products, totalPrice } = req.body;
  try {
    const order = new Order({
      email,
      products,
      totalPrice,
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};