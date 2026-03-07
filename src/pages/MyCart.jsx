import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import EcmmerceService from '../services/EcommerceService';

const MyCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Load cart data from API
  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await EcmmerceService.getMyCart();
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setMessage({ type: 'danger', text: 'Could not load your cart.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Handle Remove Item
  const handleRemove = async (itemId) => {
    try {
      await EcmmerceService.removeFromCart(itemId);
      // Refresh cart after removal
      loadCart();
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to remove item.' });
    }
  };

  // Handle Checkout (Place Order)
  const handleCheckout = async () => {
    try {
      await EcmmerceService.placeOrder();
      setMessage({ type: 'success', text: 'Order placed successfully! Redirecting...' });
      // Clear local cart view
      setCart(null);
      // Redirect to orders page after a short delay
      setTimeout(() => navigate('/my-orders'), 2000);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: 'Checkout failed. Ensure you have enough balance and items are in stock.' 
      });
    }
  };

  if (loading) return <Container className="mt-5 text-center"><h3>Loading Cart...</h3></Container>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <Card className="p-5 shadow-sm border-0">
          <h3>Your cart is empty</h3>
          <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
          <div className="mt-3">
            <Button as={Link} to="/" variant="primary">Go to Marketplace</Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      
      {message && <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>{message.text}</Alert>}

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="py-3">Price</th>
                    <th className="py-3 text-center">Quantity</th>
                    <th className="py-3">Total</th>
                    <th className="py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody style={{ verticalAlign: 'middle' }}>
                  {cart.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 fw-bold">{item.productName}</td>
                      <td>${item.productPrice.toFixed(2)}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="fw-bold">${item.totalAmount.toFixed(2)}</td>
                      <td className="text-center">
                        <Button 
                          variant="link" 
                          className="text-danger p-0" 
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <Card.Body className="p-4">
              <h4 className="mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="h5">Total</span>
                <span className="h5 text-primary">${cart.totalAmount.toFixed(2)}</span>
              </div>
              <Button 
                variant="success" 
                size="lg" 
                className="w-100 py-3 fw-bold" 
                onClick={handleCheckout}
              >
                PLACE ORDER
              </Button>
              <div className="mt-3 text-center">
                <Link to="/" className="text-decoration-none small">Continue Shopping</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyCart;