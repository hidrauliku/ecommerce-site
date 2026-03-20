import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import EcommerceService from '../services/EcommerceService';

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    EcommerceService.getMyProducts().then(res => setMyProducts(res));
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Inventory</h2>
        <Button href="/create-product" variant="primary">Add New Product</Button>
      </div>
      <Table striped hover className="bg-white shadow-sm rounded">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myProducts.map(p => (
            <tr key={p.id}>
              <td>{p.productName}</td>
              <td>${p.productPrice}</td>
              <td>{p.stock}</td>
              <td>
                <Badge bg={p.stock > 0 ? "success" : "danger"}>
                  {p.stock > 0 ? "Active" : "Out of Stock"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyProducts;