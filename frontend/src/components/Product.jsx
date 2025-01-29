import React from 'react';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './Product.css'; // Ensure you have the necessary CSS for custom styles

const products = [
  {
    id: 1,
    name: 'Earphones',
    image: '/images/jblearphone.png',
    description: 'Details about the Earphones...',
    productPage: '/earphones' // URL for the existing product page
  },
  {
    id: 2,
    name: 'Headphones',
    image: '/images/jblt450.png',
    description: 'Details about the Headphones...',
    productPage: '/headphones' // URL for the existing product page
  },
  {
    id: 3,
    name: 'Gaming Headphones',
    image: '/images/roggamingheadset.png',
    description: 'Details about the Gaming Headphones...',
    productPage: '/gamingheadphones' // URL for the existing product page
  },
  {
    id: 4,
    name: 'Speakers',
    image: '/images/jblspeaker.png',
    description: 'Details about the Speakers...',
    productPage: '/speakers' // URL for the existing product page
  },
];

const Product = () => {
  return (
    <Box sx={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontFamily: 'Revalia', fontSize: '2rem', textAlign: 'center' }}>
        Our Products
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ backgroundColor: '#1c1c1c', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <Link to={product.productPage} style={{ textDecoration: 'none' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ filter: 'grayscale(100%)', transition: 'filter 0.3s', '&:hover': { filter: 'grayscale(0%)' } }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ color: '#fff', textAlign: 'center' }}>
                      {product.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Product;
