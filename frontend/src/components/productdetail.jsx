import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material'; // Material UI components
import './ProductDetail.css'; // Import custom styles (optional)

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const products = [
    { 
      id: 1, 
      name: 'Earphones', 
      image: '/images/jblearphone.png', 
      description: 'Details about the Earphones...' 
    },
    { 
      id: 2, 
      name: 'Headphones', 
      image: '/images/jblt450.png', 
      description: 'Details about the Headphones...' 
    },
    { 
      id: 3, 
      name: 'Gaming Headphones', 
      image: '/images/roggamingheadset.png', 
      description: 'Details about the Gaming Headphones...' 
    },
    { 
      id: 4, 
      name: 'Speakers', 
      image: '/images/jblspeaker.png', 
      description: 'Details about the Speakers...' 
    },
  ];

  // Find the product based on the ID from the URL
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>; // Handle product not found
  }

  return (
    <Box className="product-detail-container">
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
