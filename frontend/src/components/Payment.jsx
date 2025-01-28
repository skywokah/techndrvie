import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  // State to store order details
  const [orderDetails, setOrderDetails] = useState(null);
  // State to manage notification
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch order details
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        // Fetch user details
        const userResponse = await axios.get('https://techndrvie.onrender.com/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Fetch cart details
        const cartResponse = await axios.get('https://techndrvie.onrender.com/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Map cart items to products
        const products = cartResponse.data.items.map(item => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        }));

        // Calculate total price
        const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

        // Set order details
        setOrderDetails({
          email: userResponse.data.email,
          products,
          totalPrice,
        });
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    // Fetch order details if authenticated, otherwise navigate to login
    if (isAuthenticated) {
      fetchOrderDetails();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Function to handle payment
  const handlePay = async () => {
    try {
      const token = localStorage.getItem('token');
      // Send order details to backend
      await axios.post('https://techndrvie.onrender.com/api/orders', orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Show success notification
      setNotification({ open: true, message: 'Order placed successfully', severity: 'success' });
    } catch (error) {
      console.error('Error placing order:', error);
      // Show error notification
      setNotification({ open: true, message: 'Failed to place order', severity: 'error' });
    }
  };

  // Function to close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Show loading message if order details are not yet fetched
  if (!orderDetails) {
    return <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontFamily: 'Revalia', fontSize: '2rem' }}>
        Order Summary
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
        Email: {orderDetails.email}
      </Typography>

      <Grid container spacing={4}>
        {orderDetails.products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#1c1c1c' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#fff' }}>
                  Price: Rs.{product.price}
                </Typography>
                <Typography variant="body2" sx={{ color: '#fff' }}>
                  Quantity: {product.quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ color: '#fff', mt: 4 }}>
        Total Price: Rs.{orderDetails.totalPrice}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handlePay}
        sx={{ mt: 2 }}
      >
        Pay
      </Button>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Payment;