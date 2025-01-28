import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar'; // Adjust the import path as needed
import LoginPage from './components/loginpage';
import Register from './components/Registerpage';
import AvatarWithPopup from './components/AvatarWithPopup';
import Product from './components/Product';
import Homepage from './components/Homepage';
import ScrollToTop from './components/ScrollToTop';
import Earphonepage from './components/products/earphones';
import Footer from './components/footer';
import AdminPage from './components/Adminpage';
import Gamingheadphonepage from './components/products/gamingheadphones';
import Speaker from './components/products/speakers';
import Headphone from './components/products/headphones';
import Cart from './components/cart'; // Import Cart component
import { useAuth } from './AuthContext'; // Import useAuth from AuthContext
import ProductPage from './components/productpage'; // Ensure correct import path
import { AdminAuthProvider } from './components/AdminAuthContext'; // Import AdminAuthProvider
import AdminSignup from './components/AdminSignup';
import AdminLogin from './components/AdminLogin';
import Payment from './components/Payment'; // Import Payment component
import './app.css';

const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Services = () => <div>Services Page</div>;
const Contact = () => <div>Contact Page</div>;
const Login = () => <div>Login Page</div>;

function App() {
  const [load, updateLoad] = useState(true);
  const { isAuthenticated } = useAuth(); // Access authentication state

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <div className="video-background">
          <video 
            src="/images/background.MP4" 
            autoPlay 
            loop 
            muted 
            playsInline
          ></video>
        </div>
        <AdminAuthProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product" element={<Product />} />
            <Route path="/earphones" element={<Earphonepage />} /> 
            <Route path="/gamingheadphones" element={<Gamingheadphonepage />} /> 
            <Route path="/speakers" element={<Speaker />} /> 
            <Route path="/headphones" element={<Headphone />} />
            <Route path="/admin" element={<AdminPage />} /> 
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/product/:id" element={<ProductPage />} /> {/* Ensure correct element usage */}
          </Routes>
        </AdminAuthProvider>
      </div>
      <Footer />
    </Router>
  );
}

export default App;