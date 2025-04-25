import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col>
          <h1>Payment successful</h1>
          <p>Your premium account is now active.</p>
          <p>
            If you have problems please contact:{" "}
            <span className="fst-italic">admin@themus.org</span>
          </p>
          <p>
            Click{" "}
            <Link to="/coverLetterCreator" className="text-primary">
              here
            </Link>{" "}
            to return to the cover letter creator
          </p>
        </Col>
      </Row>
    </Container>
  );
}
