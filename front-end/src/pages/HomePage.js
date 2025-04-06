import React, { useState, useRef } from "react";

import { Container, Row, Col, Button, Card } from "react-bootstrap";

import PaginatedTopicList from "../components/PaginatedTopicList";
import NewsDisplay from "../components/NewsDisplay";

import heroImage from "../assets/roboComputer.png";
import robotCardOne from "../assets/robotCardOne.png";
import robotCardTwo from "../assets/robotCardTwo.png";
import robotCardThree from "../assets/robotCardThree.png";

import axios from "axios";

const features = [
  {
    title: "Reliable Performance",
    text: "Built with modern technologies to keep things running smoothly — always.",
    image: robotCardOne,
  },
  {
    title: "Various Options",
    text: "Tailor your experience to fit your needs with just a few clicks.",
    image: robotCardTwo,
  },
  {
    title: "Continuous improvement",
    text: "Keep getting better with new innovations and ways of doing things. ",
    image: robotCardThree,
  },
];

function HomePage() {
  return (
    <Container className="py-5 my-5">
      <Row className="align-items-center">
        <Col
          md={6}
          className="d-flex flex-column mb-4 mb-md-0 align-items-center"
        >
          <h1 className="display-4 align-items-center">THEM US AI</h1>
          <p className="lead">Use AI in a faster, smarter way</p>
          <Button variant="primary" size="lg" className="my-2">
            Get Started
          </Button>
        </Col>
        <Col md={6}>
          <img src={heroImage} alt="Hero" className="img-fluid rounded" />
        </Col>
      </Row>
      <Row className="mt-5 mb-3">
        <h2 className="text-center mb-4">Embrace the future</h2>
      </Row>
      <Row>
        {features.map((feature, idx) => (
          <Col key={idx} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={feature.image}
                alt={`${feature.title} icon`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                  margin: "1rem auto 0",
                }}
              />
              <Card.Body>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text>{feature.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="landingBannerBackground mt-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-4">Meet Your New Digital Assistant</h2>
              <p className="mb-4">
                Our friendly robot helpers are always learning and improving to
                make your life easier. Whether it's automating tasks or keeping
                you informed, they're ready to help.
              </p>
              <Button variant="light" size="lg">
                Learn More
              </Button>
            </Col>
            <Col md={6} className="text-center mt-4 mt-md-0">
              <img
                src="/robot_reading_resized_150x150.png"
                alt="Robot illustration"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}

export default HomePage;
