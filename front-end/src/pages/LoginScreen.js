import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import GoogleSignin from "../assets/googleSignin.png";

export default function LoginScreen() {
  // direct to google OAuth
  const handleLogin = () => {
    // window.location.href = "https://themus.onrender.com/auth/google";
    window.location.href = "https://themus.onrender.com/auth/google";
  };

  return (
    <Container>
      <Row>
        <Col className="text-center my-5">
          <h2>
            Welcome to <span className="fw-light">THEM US AI</span>
          </h2>
          <p className="text-muted">Please sign in with Google to continue</p>
          <Button variant="link" onClick={handleLogin}>
            <Image src={GoogleSignin} className="image-hover-lighten"></Image>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
