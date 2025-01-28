import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext();

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://techndrvie.onrender.com/api/admin/login', { email, password });
      setAdmin(response.data);
      localStorage.setItem('adminToken', response.data.token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await axios.post('https://techndrvie.onrender.com/api/admin/signup', { email, password });
      setAdmin(response.data);
      localStorage.setItem('adminToken', response.data.token);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, signup, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};