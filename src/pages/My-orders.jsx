import React, { useState, useEffect } from 'react';
import { Accordion, Card, Table } from 'react-bootstrap';
import ProductService from '../services/product.service';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    debugger;
    ProductService.getMyOrders().then(res => setOrders(res));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Order History</h2>
      <Accordion>
        {orders.map((order, idx) => (
          <Accordion.Item eventKey={idx} key={order.id} className="mb-3 shadow-sm">
            <Accordion.Header>
              <div className="w-100 d-flex justify-content-between pe-3">
                <span>Order <strong>#{order.orderNumber}</strong></span>
                <span className="text-primary font-weight-bold">${order.totalAmount}</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <p className="text-muted">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              <Table size="sm" borderless>
                <thead>
                  <tr className="border-bottom">
                    <th>Product</th>
                    <th>Qty</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.product.productName}</td>
                      <td>{item.quantity}</td>
                      <td className="text-end">${item.totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default MyOrders;