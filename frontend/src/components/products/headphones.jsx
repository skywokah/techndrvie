import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../AuthContext.jsx';
import { useNavigate,Link } from 'react-router-dom';
import './productss.css';

const Headphone = () => {
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for popup message
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        // Filter products by "Speakers" category
        const headphones = response.data.filter(product => product.category === 'Headphones');
        setProducts(headphones);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);



  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        await axios.post('http://localhost:5000/api/cart', {
          productId: product._id,
          quantity: 1,
        }, {
          headers: {
            Authorization: `Bearer ${token}` // Send token in headers
          }
        });
        setOpenSnackbar(true); // Show popup message
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

 return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontFamily: 'Revalia', fontSize: '2rem' }}>
        Headphones
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#1c1c1c' }}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#fff' }}>
                    Rs.{product.price}
                  </Typography>
                </CardContent>
              </Link>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleAddToCart(product)} // Add to cart logic
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Product has been added to the cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Headphone;