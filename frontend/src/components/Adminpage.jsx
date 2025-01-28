import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useAdminAuth } from './AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';

const AdminPage = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', description: '', image: null, inStock: true }); // State for new product
  const [editProduct, setEditProduct] = useState(null); // State for product being edited
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const { admin, logout } = useAdminAuth(); // Admin authentication context

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://techndrvie.onrender.com/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle input change for new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image change for new product
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  // Handle stock change for new product
  const handleStockChange = (e) => {
    const { checked } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      inStock: checked,
    }));
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('category', newProduct.category);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('image', newProduct.image);
    formData.append('inStock', newProduct.inStock);

    try {
      const token = localStorage.getItem('adminToken'); // Get token from local storage
      const response = await axios.post('https://techndrvie.onrender.com/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      });
      setProducts([...products, response.data]); // Add new product to state
      setNewProduct({ name: '', category: '', price: '', description: '', image: null, inStock: true }); // Reset new product state
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('adminToken'); // Get token from local storage
      await axios.delete(`https://techndrvie.onrender.com/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      });
      setProducts(products.filter(product => product._id !== productId)); // Remove deleted product from state
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setOpen(true);
  };

  // Handle input change for editing product
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image change for editing product
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditProduct((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  // Handle stock change for editing product
  const handleEditStockChange = (e) => {
    const { checked } = e.target;
    setEditProduct((prevState) => ({
      ...prevState,
      inStock: checked,
    }));
  };

  // Handle updating a product
  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append('name', editProduct.name);
    formData.append('category', editProduct.category);
    formData.append('price', editProduct.price);
    formData.append('description', editProduct.description);
    if (editProduct.image instanceof File) {
      formData.append('image', editProduct.image);
    } else {
      formData.append('image', editProduct.image);
    }
    formData.append('inStock', editProduct.inStock);

    try {
      const token = localStorage.getItem('adminToken'); // Get token from local storage
      const response = await axios.put(`https://techndrvie.onrender.com/api/products/${editProduct._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      });
      setProducts(products.map(product => (product._id === editProduct._id ? response.data : product))); // Update product in state
      setEditProduct(null);
      setOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle closing the edit dialog
  const handleClose = () => {
    setEditProduct(null);
    setOpen(false);
  };

  // If admin is not logged in, show login and signup forms
  if (!admin) {
    return (
      <Box sx={{ p: 4 }}>
        <AdminLogin />
        <AdminSignup />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontFamily: 'Revalia' }}>
        Admin Page - Product Management
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          label="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          variant="outlined"
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <FormControl sx={{ minWidth: 200, color: '#fff' }}>
          <InputLabel sx={{ color: '#fff' }}>Category</InputLabel>
          <Select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            sx={{ color: 'white' }}
          >
            <MenuItem value="GamingHeadphones">Gaming Headphones</MenuItem>
            <MenuItem value="Earbuds">Earbuds</MenuItem>
            <MenuItem value="Speakers">Speakers</MenuItem>
            <MenuItem value="Headphones">Headphones</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Price"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange} 
          variant="outlined"
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          variant="outlined"
          multiline
          rows={4}
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={newProduct.inStock}
              onChange={handleStockChange}
              name="inStock"
              color="primary"
            />
          }
          label="In Stock"
          sx={{ color: 'white' }}
        />
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="raised-button-file"
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <img src={`http://localhost:5000/${product.image}`} alt={product.name} style={{ width: '100px' }} />
                </TableCell>
                <TableCell>{product.inStock ? 'In Stock' : 'Out of Stock'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="name"
            value={editProduct?.name || ''}
            onChange={handleEditInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={editProduct?.category || ''}
              onChange={handleEditInputChange}
            >
              <MenuItem value="Gaming Headphones">Gaming Headphones</MenuItem>
              <MenuItem value="Earbuds">Earbuds</MenuItem>
              <MenuItem value="Speakers">Speakers</MenuItem>
              <MenuItem value="Headphones">Headphones</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Price"
            name="price"
            value={editProduct?.price || ''}
            onChange={handleEditInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={editProduct?.description || ''}
            onChange={handleEditInputChange}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                checked={editProduct?.inStock || false}
                onChange={handleEditStockChange}
                name="inStock"
                color="primary"
              />
            }
            label="In Stock"
            sx={{ color: 'black' }}
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleEditImageChange}
            style={{ display: 'none' }}
            id="edit-button-file"
          />
          <label htmlFor="edit-button-file">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;