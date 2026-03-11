import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import EcommerceService from '../services/EcommerceService';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    EcommerceService.getAllProducts().then(res => setProducts(res));
  }, []);

  const handleQtyChange = (id, val) => {
    setQuantities({ ...quantities, [id]: parseInt(val) });
  };

  const addToCart = async (productId) => {
    const qty = quantities[productId] || 1;
    const productdata=
    {
  productId: productId,
  quantity: qty 
}
    try {
      await EcommerceService.addToCart(productdata);
      setMessage({ type: 'success', text: 'Added to cart!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'danger', text: 'Failed to add item.' });
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Marketplace</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Row>
        {products.map(p => (
          <Col md={4} key={p.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src={p.imageUrl || 'https://blocks.astratic.com/img/general-img-landscape.png'} />
              <Card.Body>
                <Card.Title>{p.productName}</Card.Title>
                <Card.Text className="text-muted">{p.productDescription}</Card.Text>
                <h5 className="text-primary">${p.productPrice}</h5>
                <p className="small">Stock: {p.stock}</p>
                <div className="d-flex gap-2">
                  <Form.Control 
                    type="number" min="1" max={p.stock} defaultValue="1"
                    onChange={(e) => handleQtyChange(p.id, e.target.value)}
                    style={{ width: '70px' }}
                  />
                  <Button variant="primary" onClick={() => addToCart(p.id)}>Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Marketplace;