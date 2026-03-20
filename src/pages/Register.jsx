import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await AuthService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{ marginTop: '5vh' }}>
      <Card style={{ width: '100%', maxWidth: '450px' }} className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Join AL Auctions</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Account created! Redirecting to login...</Alert>}

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" minLength="3" maxLength="20" required onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control name="email" type="email" required onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" minLength="8" required onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control name="confirmPassword" type="password" required onChange={handleChange} />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">Register</Button>
          </Form>
          <div className="text-center mt-3">
            <small>Already have an account? <Link to="/login">Login here</Link></small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;