import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext.jsx';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://techndrvie.onrender.com/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        await axios.post('https://techndrvie.onrender.com/api/cart', {
          productId: product._id,
          quantity: 1,
        }, {
          headers: {
            Authorization: `Bearer ${token}` // Send token in headers
          }
        });
        alert('Product added to cart!');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={`https://techndrvie.onrender.com/${product.image}`} alt={product.name} />
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p className="product-category">{product.category}</p>
        <p className="product-price">Rs.{product.price}</p>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;