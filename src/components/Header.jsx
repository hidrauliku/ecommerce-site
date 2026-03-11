import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../services/auth.service';
import EcommerceService from '../services/EcommerceService';
import './../App.css'; 

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      fetchBalance();
    }
  }, [location]);

  const fetchBalance = async () => {
    try {
      const balance = await EcommerceService.getBalance();
      setBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/login');
  };

  return (
    <div className="header-wrapper">
      <Navbar expand="lg" className="navbar-custom" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand">
            AL AUCTIONS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggler" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto nav">
  <Nav.Link as={Link} to="/" className="nav-link">Marketplace</Nav.Link>
  {currentUser && (
    <>
      <Nav.Link as={Link} to="/my-products" className="nav-link">My Inventory</Nav.Link>
      <Nav.Link as={Link} to="/my-orders" className="nav-link">Order History</Nav.Link>
    </>
  )}
</Nav>

<Nav className="nav-right align-items-center">
  {currentUser ? (
    <>
      {/* Cart Link */}
      <Nav.Link as={Link} to="/cart" className="nav-link me-3">
        <span>🛒</span> Cart
      </Nav.Link>
      
      <Navbar.Text className="me-3 balance text-light">
        ${balance !== null ? parseFloat( balance).toFixed(2) : '0.00'}
      </Navbar.Text>
      
      <Button variant="outline-light" size="sm" onClick={logOut}>Log Out</Button>
    </>
  ) : (
    <>
      <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
      <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
    </>
  )}
</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;