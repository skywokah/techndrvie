import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, IconButton } from '@mui/material';
import { useAuth } from '../AuthContext.jsx';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from the API
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}` // Send token in headers
          }
        });
        setCartItems(response.data.items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (isAuthenticated) {
      fetchCartItems();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/cart/${itemId}`, { quantity: newQuantity }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.map(item => item._id === itemId ? { ...item, quantity: newQuantity } : item));
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item.product && item.product.price) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontFamily: 'Revalia', fontSize: '2rem' }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
              <Card sx={{ backgroundColor: '#1c1c1c' }}>
                {item.product && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:5000/${item.product.image}`} // Ensure correct path
                    alt={item.product.name}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                    {item.product ? item.product.name : 'Product name not available'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    Rs.{item.product ? item.product.price : 'N/A'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Typography variant="body2" sx={{ color: '#fff', mx: 2 }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemoveItem(item._id)}
                      sx={{ ml: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#fff' }}>
            Your cart is empty.
          </Typography>
        )}
      </Grid>
      <Typography variant="h6" sx={{ color: '#fff', mt: 4 }}>
        Total Price: Rs.{calculateTotalPrice()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/payment')}
        sx={{ mt: 2 }}
      >
        Proceed to Pay
      </Button>
    </Box>
  );
};

export default Cart;