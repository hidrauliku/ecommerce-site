import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Container>
          <Row>
            <Col md={9} className="footer-column">
              <h4 className="footer-heading">AL AUCTIONS</h4>
              <p className="footer-text">
                Your trusted platform for buying and selling unique items.
              </p>
            </Col>
            <Col md={3} className="footer-column">
              <h4 className="footer-heading">QUICK LINKS</h4>
              <ul className="footer-links">
                <li><Link to="/">Browse Auctions</Link></li>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <p className="copyright-text mb-0">
            © {new Date().getFullYear()} AL Auctions. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;