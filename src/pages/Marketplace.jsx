import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Card, Button, Form, Alert, Pagination,Spinner } from 'react-bootstrap';
import EcommerceService from '../services/EcommerceService';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);


  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
 
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  const availablePageSizeOptions = [6, 9, 12, 15];


  useEffect(() => {
    setIsLoading(true);
    EcommerceService.getAllProducts().then(res => {
      setProducts(res);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
      setMessage({ type: 'danger', text: 'Failed to load products.' });
    });
  }, []);

  
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(p => 
      p.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Pagination logic 
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleQtyChange = (id, val) => {
    setQuantities({ ...quantities, [id]: parseInt(val) });
  };

  const addToCart = async (productId) => {
    const qty = quantities[productId] || 1;
    const productData = {
      productId: productId,
      quantity: qty 
    };

    try {
      await EcommerceService.addToCart(productData);
      setMessage({ type: 'success', text: 'Added to cart!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'danger', text: 'Failed to add item.' });
    }
  };

  // Handle Search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  
    setCurrentPage(1);
  };

  // Handle Page Navigation
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(e.target.value);
 
    setCurrentPage(1);
  };

  if (isLoading) return <div className="text-center p-5"><Spinner animation="border" role="status" /></div>;

  return (
    <div className="container">
      <h2 className="mb-4">Marketplace</h2>
      
      {message && <Alert variant={message.type}>{message.text}</Alert>}


      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
  <Form.Group className="d-flex align-items-center">
    <Form.Control
      type="text"
      placeholder="Search products..."
      onChange={handleSearchChange}
      value={searchTerm}
      style={{ minWidth: 250 }} 
    />
  </Form.Group>

  <Form.Group className="d-flex align-items-center">
    <Form.Label
      className="text-muted mb-0 me-2"
      style={{ fontSize: '0.85rem' }}
    >
      Items/Page:
    </Form.Label>
    <Form.Select
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
      style={{ width: 80 }} 
    >
      {availablePageSizeOptions.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
</div>

      <Row>
        {paginatedProducts.map(p => (
          <Col md={4} key={p.id} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img 
                variant="top" 
                src={p.imageUrl || 'https://blocks.astratic.com/img/general-img-landscape.png'} 
                alt={p.productName}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{p.productName}</Card.Title>
                <Card.Text className="text-muted text-truncate">{p.productDescription}</Card.Text>
                <h5 className="text-primary mb-1">${p.productPrice}</h5>
                <p className="small mb-3">Stock: {p.stock}</p>
                
                <div className="d-flex gap-2">
                  <Form.Control 
                    type="number" 
                    min="1" 
                    max={p.stock} 
                    defaultValue={1}
                    onChange={(e) => handleQtyChange(p.id, e.target.value)}
                    style={{ width: '70px' }}
                    className="shadow-none"
                  />
                  <Button 
                    variant="primary" 
                    onClick={() => addToCart(p.id)} 
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center mt-5">
  <div className="d-flex align-items-center mb-2 justify-content-center gap-2">
    <span className="small text-muted me-2">Page</span>
    <span className="fw-bold">{currentPage}</span>
    <span className="small text-muted mx-2">of</span>
    <span className="fw-bold">{totalPages}</span>
  </div>

  <Pagination.Prev
    onClick={() => handlePageClick(currentPage - 1)}
    disabled={currentPage === 1}
  />

  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
    <Pagination.Item
      key={pageNum}
      active={pageNum === currentPage}
      onClick={() => handlePageClick(pageNum)}
    >
      {pageNum}
    </Pagination.Item>
  ))}

  <Pagination.Next
    onClick={() => handlePageClick(currentPage + 1)}
    disabled={currentPage === totalPages}
  />

  <div className="text-center mt-2">
    <span className="small text-muted">
      Showing <strong>{paginatedProducts.length}</strong> of{' '}
      <strong>{filteredProducts.length}</strong> products
    </span>
  </div>
</Pagination>
    </div>
  );
};

export default Marketplace;
