import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { BsCheck2 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function PricingCoverLetter() {
  const plans = [
    {
      title: "Free",
      subtitle: "Perfect if you want to try or you don't need many letters",
      price: 0,
      features: ["3 letters/month", "online letter storage"],
      button: "Continue",
      btnVariant: "outline-primary",
      linkTo: "/loginScreen",
    },
    {
      title: "Pro",
      subtitle: "If you really need that job and you want a lot of letters",
      price: 2.99,
      features: ["100 letters/month", "online letter storage", "email support"],
      button: "Get started",
      btnVariant: "outline-primary",
      linkTo: "/coverLetterCreator",
    },
  ];

  return (
    <Container>
      <Row className="my-5">
        <Col className="text-center">
          <h1>Pricing</h1>
        </Col>
      </Row>
      <Row xs={1} md={2} className="mt-3 mb-5 justify-content-center">
        {plans.map(
          (
            { title, subtitle, price, features, button, btnVariant, linkTo },
            i
          ) => (
            <Col
              key={i}
              className="px-5 d-flex col-lg-4 justify-content-center"
            >
              <Card
                className="mb-4 shadow-sm rounded-3"
                style={{ maxWidth: "20rem", width: "100%" }}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="">{title}</Card.Title>
                  <Card.Subtitle className="mb-2 fw-light">
                    {subtitle}
                  </Card.Subtitle>

                  <Card.Title className="pricing-card-title">
                    £{price}
                    <small className="text-muted fw-light">/month</small>
                  </Card.Title>
                  <ul className="list-unstyled mt-3 mb-4">
                    {features.map((feature, idx) => (
                      <li key={idx}>
                        {" "}
                        <BsCheck2 size={20} className="me-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={btnVariant}
                    size="lg"
                    className="w-100 mt-auto"
                    as={Link}
                    to={linkTo}
                  >
                    {button}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
}
