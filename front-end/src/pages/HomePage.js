import React, { useState, useRef } from "react";

import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import PaginatedTopicList from "../components/PaginatedTopicList";
import NewsDisplay from "../components/NewsDisplay";

import heroImage from "../assets/roboComputer.png";
import robotCardOne from "../assets/robotCardOne.png";
import robotCardTwo from "../assets/robotCardTwo.png";
import robotCardThree from "../assets/robotCardThree.png";
import ThemUsScreenshotSmaller from "../assets/ThemUsScreenshotSmaller.jpg";

import axios from "axios";

import { useAuth } from "../contexts/AuthContext";

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

const services = [
  {
    title: "CV writer",
    text: "Write a CV in British English using AI.",
    link: "/coverLetterGenerator",
  },
];

function HomePage() {
  // is signed in as user?
  const { user } = useAuth();

  return (
    <Container className="py-5 my-5">
      {user && <h3 className="">You are viewing as {user.displayName}</h3>}

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
        <h2 className="text-center display-5 fw-bold mb-5">
          Embrace the future
        </h2>
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
      <div className="landingBannerBackground my-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="px-4">
              <h2 className="mb-4">Meet Your computerised Assistant</h2>
              <p className="mb-4">
                Our AI tools are constantly evolving to serve you better.
                Whether you're looking to save time, speed up your routine, or
                just make life a little easier, we're here to help—every step of
                the way.
              </p>
              {/* <Button variant="light" size="lg">
                Learn More
              </Button> */}
            </Col>
            <Col md={6} className="text-center mt-4 mt-md-0 px-4">
              <img
                src={ThemUsScreenshotSmaller}
                alt="Robot illustration"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Row className="my-5 mb-3">
        <h2 className="text-center display-5 fw-bold mb-4">Our services</h2>
      </Row>

      {services.map((services, idx) => (
        <Row
          key={idx}
          className="row-cols-1 row-cols-lg-3 align-items-stretch g-4"
        >
          <Col>
            <Link to={services.link} className="text-decoration-none">
              <Card
                className="h-100 text-white bg-dark rounded-5 shadow-lg card-cover overflow-hidden"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                  <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                    {services.title}{" "}
                  </h2>
                  <p>{services.text}</p>

                  {/* <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src={heroImage}
                      alt="Bootstrap"
                      width={32}
                      height={32}
                      roundedCircle
                      className="border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlinkHref="#geo-fill" />
                    </svg>
                    <small>Earth</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <svg className="bi me-2" width="1em" height="1em">
                      <use xlinkHref="#calendar3" />
                    </svg>
                    <small>3d</small>
                  </li>
                </ul> */}
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
      ))}

      {/* <Row>
        {services.map((services, idx) => (
          <Col key={idx} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{services.title}</Card.Title>
                <Card.Text>{services.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}

      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h2 className="display-5 fw-bold mb-4">We hope you find value</h2>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <p className="lead mb-4">
                The world is changing and it shouldn't be something to be
                concerned about. We're going to be using AI tools more and more
                as time goes by. At Them Us AI we don't want a conflict. We want
                to work together with AI for an easier life.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <Button variant="primary" size="lg" className="px-4 me-sm-3">
                  See services
                </Button>
                <Button variant="outline-secondary" size="lg" className="px-4">
                  Learn more
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <Container className="px-5">
            <img
              src={ThemUsScreenshotSmaller}
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="700"
              height="500"
              loading="lazy"
            />
          </Container>
        </div>
      </div>
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
        <Col lg={6}>
          <Image
            src={heroImage}
            alt="Bootstrap Themes"
            fluid
            loading="lazy"
            className="d-block mx-auto"
          />
        </Col>
        <Col lg={6} className="text-center text-md-start">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Welcome to a brand new world
          </h1>
          <p className="lead">
            We're going to keep growing and developing to make things better and
            better. We want you to join us on this journey and we hope it helps
            you and your life.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Button variant="primary" size="lg" className="px-4 me-md-2">
              See services
            </Button>
            <Button variant="outline-secondary" size="lg" className="px-4">
              Learn more
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
