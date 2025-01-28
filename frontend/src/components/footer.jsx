import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="4" className="footer-text">
            <p>© 2024 Tech'n'Drive. All Rights Reserved.</p>
          </Col>
          <Col md="4" className="footer-text">
            <p>Follow us on social media!</p>
          </Col>
          <Col md="4" className="footer-text">
            <p><a href="/privacy">Privacy Policy</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;