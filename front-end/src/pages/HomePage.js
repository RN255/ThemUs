import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Col, Button } from "react-bootstrap";

import PaginatedTopicList from "../components/PaginatedTopicList";
import NewsDisplay from "../components/NewsDisplay";

import heroImage from "../assets/roboComputer.png";

import axios from "axios";

function HomePage() {
  return (
    <Container className="py-5 my-5">
      <Row className="align-items-center">
        <Col md={6} className="d-flex flex-column mb-4 mb-md-0 align-items-center">
          <h1 className="display-4 align-items-center">THEM US AI</h1>
          <p className="lead">
            Use AI in a faster, smarter way
          </p>
          <Button variant="primary" size="lg" className="my-2">
            Get Started
          </Button>
        </Col>
        <Col md={6}>
          <img src={heroImage} alt="Hero" className="img-fluid rounded" />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
