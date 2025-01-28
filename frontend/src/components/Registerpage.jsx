import React, { useState } from 'react'; // React hooks for state management
import { TextField, Button, Typography, Container, Box, Grid, Link } from '@mui/material'; // Material-UI components
import { useNavigate } from 'react-router-dom'; // For navigation between pages
import axios from 'axios'; // Axios for HTTP requests
import './product.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' }); // State for register input values
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // React Router's navigate function

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update specific field in formData
    }));
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const apiUrl ='http://localhost:5000/api/auth/register';

      const response = await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 200) {
        // On success, navigate to login page
        alert('Registration successful');
        setError('');
        navigate('/login'); // Navigate to login page
      } else {
        setError(response.data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      const errorMessage =
        err.response?.data?.error || 'Something went wrong. Please check your connection or try again later.';
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontFamily: 'Revalia' }}>
        Register
      </Typography>
      <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          {/* Email Input */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
          </Grid>

          {/* Password Input */}
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
          </Grid>

          {/* Confirm Password Input */}
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Link href="/login" variant="body2">
              {"Already have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterPage;
