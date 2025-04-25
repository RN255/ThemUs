import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col>
          <h1>Payment Cancelled</h1>
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
