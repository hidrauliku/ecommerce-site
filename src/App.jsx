import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Header from './components/Header';
import Footer from './components/Footer';
import PageBackground from './components/PageBg';

import Marketplace from './pages/Marketplace';
import MyCart from './pages/MyCart';
import MyProducts from './pages/MyProducts';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateProduct from './pages/CreateProduct';
import UserProfile from './pages/UserProfile';
import authService from './services/auth.service';

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

            {authService.isAuthenticated()&&
            <>
               <Route path='/user-profile'element={<UserProfile/>} />
            <Route path="/cart" element={<MyCart />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/my-orders" element={<MyOrders />} />
            
            </>}
           
            <Route path="*" element={<div className="text-center"><h2>404 - Page Not Found</h2></div>} />
          </Routes>
        </PageBackground>

        <Footer />
      </div>
    </Router>
  );
}

export default App;