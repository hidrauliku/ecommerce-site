
import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import EcommerceService from '../services/EcommerceService';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: 1,
    stock: 1,
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'productPrice' || name === 'stock' ? +value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EcommerceService.createProduct(formData);
      // Optionally reset form or redirect
      setFormData({
        productName: '',
        productDescription: '',
        productPrice: 1,
        stock: 1,
        imageUrl: '',
      });
      alert('Product created successfully!');
    } catch (err) {
      console.error('Create product error:', err);
      alert('Failed to create product.');
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4>Add New Product</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0.01"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://blocks.astratic.com/img/general-img-landscape.png"
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Create Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateProduct;