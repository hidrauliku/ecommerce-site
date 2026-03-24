import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Form, Button } from 'react-bootstrap';
import EcommerceService from '../services/EcommerceService';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const [topUpAmount, setTopUpAmount] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await EcommerceService.getProfile();
        const wallet = await EcommerceService.getBalance();
        setUser(profile);
        setBalance(wallet.balance);
        setMessage(null);
      } catch (err) {
        console.error(err);
        setMessage({ type: 'danger', text: 'Failed to load profile.' });
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleTopUpAmountChange = (e) => {
    setTopUpAmount(e.target.value);
  };

  const handleUpdateBalance = async (e) => {
    e.preventDefault();
    const amount = parseFloat(topUpAmount);
    if (!amount || amount <= 0) {
      setMessage({ type: 'warning', text: 'Please enter a valid positive amount.' });
      return;
    }

    setIsUpdating(true);
    try {
      await EcommerceService.updateBalance(amount);
      const newBalance = await EcommerceService.getBalance();
      setBalance(newBalance);
      setTopUpAmount('');
      setMessage({ type: 'success', text: `Balance updated! New balance: $${newBalance}` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Failed to update balance.' });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">User Profile</h2>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Row>
        <Col md={8} lg={6}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header as="h5" className="bg-primary text-white">
              Personal Info
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Username:</strong>{' '}
                <span className="text-muted">{user?.username || '–'}</span>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <span className="text-muted">{user?.email || '–'}</span>
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} lg={6}>
          <Card className="shadow-sm mb-4 border-0">
            <Card.Header as="h5" className="bg-info text-white">
              Wallet
            </Card.Header>
            <Card.Body>
              <h4 className="text-primary">${balance|| '0.00'}</h4>
              <Badge bg="secondary" className="me-2">
                Wallet Balance
              </Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12} lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header as="h5" className="bg-warning text-white">
              Update Balance
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdateBalance}>
                <Form.Group className="mb-3">
                  <Form.Label>Top‑up amount ($)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 10.50"
                    value={topUpAmount}
                    onChange={handleTopUpAmountChange}
                    disabled={isUpdating}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                  disabled={isUpdating || !topUpAmount}
                >
                  {isUpdating ? 'Updating...' : 'Top‑up Balance'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12} lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header as="h5" className="bg-primary text-white">
              Activities
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={6} className="mb-3">
                  <p className="m-0">
                    <strong>Products Sold</strong>
                  </p>
                  <span className="text-muted">{user?.productsSold || 0}</span>
                </Col>
                <Col xs={6} className="mb-3">
                  <p className="m-0">
                    <strong>Products Bought</strong>
                  </p>
                  <span className="text-muted">{user?.productsBought || 0}</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default UserProfile;