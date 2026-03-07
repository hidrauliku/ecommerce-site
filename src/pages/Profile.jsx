import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, ListGroup, Badge } from 'react-bootstrap';
import AuthService from '../services/auth.service';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      // Assuming you have a standard axios call for /api/User/profile
      axios.get('/api/User/profile', { 
        headers: { Authorization: 'Bearer ' + user.token } 
      }).then(res => setProfile(res.data));
    }
  }, []);

  if (!profile) return <div className="text-center p-5">Loading Hero Profile...</div>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0 overflow-hidden">
            <Card.Header className="bg-primary text-white p-4">
              <h3 className="mb-0">User Profile</h3>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                <ListGroup.Item className="p-4">
                  <Row>
                    <Col sm={4} className="text-muted">Username</Col>
                    <Col sm={8} className="fw-bold">{profile.username}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-4">
                  <Row>
                    <Col sm={4} className="text-muted">Email</Col>
                    <Col sm={8}>{profile.email}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-4">
                  <Row>
                    <Col sm={4} className="text-muted">Wallet Balance</Col>
                    <Col sm={8}>
                      <Badge bg="success" className="fs-6 px-3">
                        ${profile.walletBalance?.toFixed(2)}
                      </Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Row className="mt-4">
            <Col md={6}>
              <Card className="text-center shadow-sm border-0 mb-3">
                <Card.Body>
                  <Card.Title className="text-muted">Products Sold</Card.Title>
                  <h2 className="text-primary">{profile.productsSold}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="text-center shadow-sm border-0 mb-3">
                <Card.Body>
                  <Card.Title className="text-muted">Items Purchased</Card.Title>
                  <h2 className="text-success">{profile.productsBought}</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;