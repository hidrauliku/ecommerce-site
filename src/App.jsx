import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Header from './components/Header';
import Footer from './components/Footer';
import PageBackground from './components/PageBg';

import Marketplace from './pages/Marketplace';
import MyCart from './pages/MyCart';
import MyProducts from './pages/My-products';
import MyOrders from './pages/My-orders';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateProduct from './pages/New-Product';
import UserProfile from './pages/User-Profile';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <PageBackground>
          <Routes>
          
            <Route path="/" element={<Marketplace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path='/user-profile'element={<UserProfile></UserProfile>} />
            <Route path="/cart" element={<MyCart />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="*" element={<div className="text-center"><h2>404 - Page Not Found</h2></div>} />
          </Routes>
        </PageBackground>

        <Footer />
      </div>
    </Router>
  );
}

export default App;