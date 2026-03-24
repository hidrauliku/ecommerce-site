import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Alert } from 'react-bootstrap';
import EcommerceService from '../services/EcommerceService'
const MyCart = () => {
  const [cart, setCart] = useState(null);
  const [status, setStatus] = useState(null);

  const fetchCart = () => {
    EcommerceService.getMyCart().then(res => setCart(res.data));
  };

  useEffect(() => { fetchCart(); }, []);

  const removeItem = async (id) => {
    await EcommerceService.removeFromCart(id);
    fetchCart();
  };

  const checkout = async () => {
    try {
      await EcommerceService.placeOrder();
      setStatus({ type: 'success', text: 'Order placed successfully!' });
      setCart(null);
    } catch (err) {
      setStatus({ type: 'danger', text: 'Checkout failed. Check balance/stock.' });
    }
  };

  if (!cart || cart.items.length === 0) return <div className="text-center p-5"><h4>Your cart is empty.</h4></div>;

  return (
    <div className="container">
      <h2 className="mb-4">Shopping Cart</h2>
      {status && <Alert variant={status.type}>{status.text}</Alert>}
      <Card className="shadow-sm p-3">
        <Table responsive vertical="middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(item => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>${item.productPrice}</td>
                <td>${item.totalAmount}</td>
                <td><Button variant="outline-danger" size="sm" onClick={() => removeItem(item.id)}>Remove</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-end mt-3">
          <h4>Total: <span className="text-success">${cart.totalAmount}</span></h4>
          <Button variant="success" size="lg" className="mt-2" onClick={checkout}>Place Order</Button>
        </div>
      </Card>
    </div>
  );
};

export default MyCart;