import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export default function Info() {
  return (
    <Container className="py-5 page-fade-in">
      <Row className="justify-content-center">
        <Col>
          <h1 className="blueText">Welcome to Them Us AI</h1>
          <p className="mt-4">
            The world is evolving — and that's something to embrace, not fear.
            At Them Us AI, we believe in a future where humans and AI
            collaborate, not compete. Together, we can unlock new possibilities,
            simplify the complex, and build a better tomorrow — side by side
            with the tools that are shaping it.
          </p>
          <p>Keep coming back for improvements and new features.</p>
          <p>
            {" "}
            Contact email: <span className="fst-italic">admin@themus.org</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
