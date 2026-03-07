import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    // <footer className="greek-footer">
   
    //   <div className="greek-meander-top"></div>
      
    //   <div className="footer-main">
    //     <Container>
    //       <Row>
    //         <Col md={9} className="footer-column">
    //           <h4 className="footer-heading">AL  AUCTIONS</h4>
    //           <p className="footer-text">
    //             Lërem Ipsum
    //           </p>
    //           <div className="footer-social">
    //             <a href="/" className="social-icon">
    //               <i className="fa fa-facebook"></i>
    //             </a>
    //             <a href="/" className="social-icon">
    //               <i className="fa fa-twitter"></i>
    //             </a>
    //             <a href="/" className="social-icon">
    //               <i className="fa fa-instagram"></i>
    //             </a>
    //           </div>
    //         </Col>
            
    //         <Col md={3} className="footer-column">
    //           <h4 className="footer-heading">QUICK LINKS</h4>
    //           <ul className="footer-links">
    //             <li><Link to="/">Browse Auctions</Link></li>
    //             <li><Link to="/how-it-works">How It Works</Link></li>
    //             <li><Link to="/faq">FAQ</Link></li>
    //             <li><Link to="/contact">Contact Us</Link></li>
    //           </ul>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </div>
      
    //   <div className="footer-bottom">
    //     <Container>
    //       <p className="copyright-text">
    //         © {new Date().getFullYear()} Al Auctions. All rights reserved.
    //       </p>
    //     </Container>
    //   </div>
    // </footer>
    <footer className="footer">
  <div className="footer-main">
    <Container>
      <Row>
        <Col md={9} className="footer-column">
          <h4 className="footer-heading">AL AUCTIONS</h4>
          <p className="footer-text">
            Lërem Ipsum
          </p>
          <div className="footer-social">
            <a href="/" className="social-icon">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="/" className="social-icon">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/" className="social-icon">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
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
      <p className="copyright-text">
        © {new Date().getFullYear()} Al Auctions. All rights reserved.
      </p>
    </Container>
  </div>
</footer>
  );
};

export default Footer;