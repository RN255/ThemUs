import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { BsCheck2 } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function PricingCoverLetter() {
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        `https://themus.onrender.com/payment/create-checkout-session`,
        {},
        { withCredentials: true }
      );
      window.location.href = data.url; // Stripe checkout page
    } catch (error) {
      console.error("Error redirecting to Stripe:", error);
      alert("Could not start payment process. Please try again.");
    }
  };

  // is signed in as user?
  const { user } = useAuth();

  return (
    <Container>
      <Row className="my-5">
        <Col className="text-center">
          <h1>Pricing</h1>
        </Col>
      </Row>
      <Row xs={1} md={2} className="mt-3 mb-5 justify-content-center">
        <Col className="px-5 d-flex col-lg-4 justify-content-center">
          <Card
            className="mb-4 shadow-sm rounded-3"
            style={{ maxWidth: "20rem", width: "100%" }}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="standardBlueColour mb-3">Free</Card.Title>
              <Card.Subtitle className="mb-3 fw-light">
                Perfect if you want to try or you don't need many letters
              </Card.Subtitle>
              <Card.Title className="pricing-card-title">
                £0
                <small className="text-muted fw-light"> / month</small>
              </Card.Title>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  <BsCheck2 size={20} className="me-2" />3 letters/month
                </li>
                <li>
                  <BsCheck2 size={20} className="me-2" />
                  online letter storage
                </li>
              </ul>
              <Button
                variant="btn btn-outline-primary disabled"
                size="lg"
                className="w-100 mt-auto"
              >
                Free
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="px-5 d-flex col-lg-4 justify-content-center">
          <Card
            className="mb-4 shadow-sm rounded-3"
            style={{ maxWidth: "20rem", width: "100%" }}
          >
            <Card.Body className="d-flex flex-column">
              <Card.Title className="standardBlueColour mb-3">
                Premium
              </Card.Title>
              <Card.Subtitle className="mb-3 fw-light">
                If you really need that job and you want a lot of letters
              </Card.Subtitle>

              <Card.Title className="pricing-card-title">
                £9.99
                <small className="text-muted fw-light"> / month</small>
              </Card.Title>
              <ul className="list-unstyled mt-3 mb-4">
                <li>
                  <BsCheck2 size={20} className="me-2" />
                  50 letters/month
                </li>
                <li>
                  <BsCheck2 size={20} className="me-2" />
                  online letter storage
                </li>
                <li>
                  <BsCheck2 size={20} className="me-2" />
                  Uses more powerful AI
                </li>

                <li>
                  <BsCheck2 size={20} className="me-2" />
                  email support
                </li>
              </ul>

              <Button
                variant="btn btn-outline-primary"
                size="lg"
                className="w-100 mt-auto"
                onClick={handleCheckout}
              >
                Upgrade
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
