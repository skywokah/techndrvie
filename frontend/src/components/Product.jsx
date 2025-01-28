import React, { useState } from 'react'; // Import React and the useState hook
import { 
  Box, Grid, Typography, Card, CardActionArea, CardMedia, CardContent 
} from '@mui/material'; // Import Material-UI components for UI design
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Product.css'; // Import custom styles

const Product = () => {
  // Static array of product details
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

  return (
    <Box className={`product-container`}>
      {/* Container for the product grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              {/* Link to the pre-existing product page */}
              <Link to={product.productPage} style={{ textDecoration: 'none' }}>
                <CardActionArea>
                  <CardMedia
                    component="img" // Displays the product image
                    height="140"
                    image={product.image} // Path to the product image
                    alt={product.name} // Alt text for accessibility
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.name} {/* Product name */}
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

